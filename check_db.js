import pg from 'pg';
const { Client } = pg;

const client = new Client({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'church_db',
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

client.connect()
  .then(async () => {
    console.log('Connected to the database successfully!');

    // Check all tables
    const tables = ['members', 'events', 'contributions', 'roles', 'sub_groups', 'users'];

    for (const table of tables) {
      try {
        const result = await client.query(`SELECT COUNT(*) as count FROM ${table}`);
        console.log(`${table}: ${result.rows[0].count} records`);
      } catch (err) {
        console.log(`${table}: Error - ${err.message}`);
      }
    }

    await client.end();
  })
  .catch(err => console.error('Connection error', err.stack));
