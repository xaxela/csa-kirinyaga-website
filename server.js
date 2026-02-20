import express from 'express';
import cors from 'cors';
import pg from 'pg';
const { Client } = pg;
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'church_secret_key_2024';

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174'] }));

app.use(express.json());

// PostgreSQL connection setup - using environment variables for security
const client = new Client({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'church_db',
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'Access token required' });
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};


client.connect()
  .then(async () => {
    console.log('Connected to the database successfully!');
    // Create users table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user'
      )
    `);

    // Add role column if it doesn't exist (for existing tables)
    await client.query(`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'user'
    `);
    // Hash a password for the test user
    const saltRounds = 10;
    const testPassword = 'testpass';
    const hashedPassword = await bcrypt.hash(testPassword, saltRounds);

    // Insert test user if not exists
    await client.query(`
      INSERT INTO users (username, password)
      VALUES ('testuser', $1)
      ON CONFLICT (username) DO UPDATE SET password = EXCLUDED.password
    `, [hashedPassword]);

    // Insert admin user if not exists
    const adminPassword = 'password';
    const hashedAdminPassword = await bcrypt.hash(adminPassword, saltRounds);
    await client.query(`
      INSERT INTO users (username, password, role)
      VALUES ('admin', $1, 'admin')
      ON CONFLICT (username) DO UPDATE SET password = EXCLUDED.password, role = EXCLUDED.role
    `, [hashedAdminPassword]);

    // Create officials table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS officials (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(50) NOT NULL,
        position VARCHAR(100),
        photo TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);


    console.log('Users table ready and test users inserted.');
  })
  .catch(err => console.error('Connection error', err.stack));

// POST /api/login - Authenticate user and return JWT token
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt:', { username, body: req.body });

  try {
    const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      // Compare the provided password with the stored hash
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        // Passwords match - Generate JWT token
        const token = jwt.sign(
          { user_id: user.user_id, username: user.username, role: user.role },
          JWT_SECRET,
          { expiresIn: '24h' }
        );
        console.log('Login successful for:', username);
        res.json({ 
          status: 'success',
          token,
          user: { user_id: user.user_id, username: user.username, role: user.role } 
        });
      } else {
        // Passwords don't match
        console.log('Invalid password for:', username);
        res.status(401).json({ status: 'error', message: 'Invalid credentials' });
      }
    } else {
      console.log('User not found:', username);
      res.status(401).json({ status: 'error', message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST /authorisation/login - Alternative login endpoint (matches church_website-main)
app.post('/authorisation/login', async (req, res) => {
  const { user, passWord } = req.body;
  console.log('Authorisation login attempt:', { user, body: req.body });

  try {
    const result = await client.query('SELECT * FROM users WHERE username = $1', [user]);
    if (result.rows.length > 0) {
      const dbUser = result.rows[0];
      const match = await bcrypt.compare(passWord, dbUser.password);
      if (match) {
        const token = jwt.sign(
          { user_id: dbUser.user_id, username: dbUser.username, role: dbUser.role },
          JWT_SECRET,
          { expiresIn: '24h' }
        );
        console.log('Authorisation login successful for:', user);
        res.json({ 
          status: 'success',
          token,
          message: 'Login successful'
        });
      } else {
        res.status(401).json({ status: 'error', message: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ status: 'error', message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Authorisation login error:', err);
    res.status(500).json({ error: err.message });
  }
});
 
// Tables and their primary keys
const tables = {
  contributions: 'contribution_id',
  event_subgroup_attendance: 'event_id,group_id', 
  events: 'event_id',
  member_roles: 'member_id,role_id', 
  members: 'member_id',
  officials: 'id',
  roles: 'role_id',
  sub_groups: 'group_id',
  users: 'user_id'
};

// POST /api/users - Create a new user (admin only)
app.post('/api/users', async (req, res) => {
  const { username, password, role = 'user' } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const query = `
      INSERT INTO users (username, password, role)
      VALUES ($1, $2, $3)
      ON CONFLICT (username) DO NOTHING
      RETURNING user_id, username, role
    `;
    const result = await client.query(query, [username, hashedPassword, role]);

    if (result.rows.length === 0) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    res.json({ success: true, user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/all - Pool all data from all tables
// This route must be defined BEFORE /api/:table to avoid being matched as a table parameter
app.get('/api/all', async (req, res) => {
  try {
    const tableNames = Object.keys(tables);
    const allData = {};
    
    for (const tableName of tableNames) {
      const result = await client.query(`SELECT * FROM ${tableName}`);
      allData[tableName] = result.rows;
    }
    
    res.json(allData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/:table - Fetch all records
app.get('/api/:table', async (req, res) => {
  const { table } = req.params;
  if (!tables[table]) return res.status(400).json({ error: 'Invalid table' });

  try {
    const result = await client.query(`SELECT * FROM ${table}`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/:table - Add a new record
app.post('/api/:table', async (req, res) => {
  const { table } = req.params;
  if (!tables[table]) return res.status(400).json({ error: 'Invalid table' });

  const data = req.body;
  const columns = Object.keys(data);
  const values = Object.values(data);
  const placeholders = columns.map((_, i) => `$${i + 1}`);

  try {
    const query = `INSERT INTO ${table} (${columns.join(',')}) VALUES (${placeholders.join(',')}) RETURNING *`;
    const result = await client.query(query, values);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





// DELETE /api/:table/:id - Delete a record
app.delete('/api/:table/:id', async (req, res) => {
  const { table, id } = req.params;
  if (!tables[table]) return res.status(400).json({ error: 'Invalid table' });

  const primaryKey = tables[table];
  let whereClause;
  let values;
  if (primaryKey.includes(',')) {
    // Composite key, assume id is comma-separated
    const ids = id.split(',');
    const keys = primaryKey.split(',');
    whereClause = keys.map((key, i) => `${key} = $${i + 1}`).join(' AND ');
    values = ids;
  } else {
    whereClause = `${primaryKey} = $1`;
    values = [id];
  }

  try {
    const query = `DELETE FROM ${table} WHERE ${whereClause}`;
    await client.query(query, values);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
