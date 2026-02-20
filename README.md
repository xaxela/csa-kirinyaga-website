# CSA Kirinyaga Website

A full-stack church management website built with React, TypeScript, Express, and PostgreSQL.

## Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **PostgreSQL** (v14 or higher)
- **npm** or **yarn**

## Project Structure

```
csa-kirinyaga-website-main/
├── src/                    # React frontend source code
│   ├── components/         # React components
│   ├── pages/              # Page components
│   ├── context/            # React context (Auth)
│   ├── services/           # API services
│   └── assets/             # Static assets
├── server.js               # Express backend server
├── check_db.js             # Database check script
├── package.json            # Root dependencies
└── README.md               # This file
```

## Database Setup

1. **Install PostgreSQL** if not already installed
2. **Create a new database** named `church_db`:
   
```
sql
   CREATE DATABASE church_db;
   
```

3. **Configure environment variables** (optional - defaults are provided):
   
   Create a `.env` file in the root directory:
   
```
env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=postgres
   DB_NAME=church_db
   DB_SSL=false
   JWT_SECRET=your_secret_key_here
   
```

## Installation

1. **Install root dependencies:**
   
```
bash
   npm install
   
```

2. **Install frontend dependencies:**
   
```
bash
   cd src
   npm install
   
```

## Running the Application

### Option 1: Run Both Frontend and Backend

You need to run the backend and frontend in separate terminals:

**Terminal 1 - Start the Backend Server:**
```
bash
node server.js
```
The backend server will start on `http://localhost:3001`

**Terminal 2 - Start the Frontend Development Server:**
```
bash
cd src
npm run dev
```
The frontend will start on `http://localhost:5173`

### Option 2: Using Concurrently (Run both with one command)

1. Install concurrently:
   
```
bash
   npm install concurrently --save-dev
   
```

2. Add this script to package.json:
   
```
json
   "scripts": {
     "dev": "concurrently \"node server.js\" \"cd src && npm run dev\""
   }
   
```

3. Run:
   
```
bash
   npm run dev
   
```

## Default Test Accounts

The server automatically creates test users on first run:

| Username | Password  | Role  |
|----------|-----------|-------|
| testuser | testpass  | user  |
| admin    | password  | admin |

## API Endpoints

### Authentication
- `POST /api/login` - User login
- `POST /authorisation/login` - Alternative login endpoint

### Database Operations
- `GET /api/all` - Get all data from all tables
- `GET /api/:table` - Get all records from a table
- `POST /api/:table` - Add a new record
- `DELETE /api/:table/:id` - Delete a record
- `POST /api/users` - Create a new user (admin only)

### Available Tables
- `users` - User accounts
- `members` - Church members
- `events` - Church events
- `contributions` - Member contributions
- `roles` - Member roles
- `sub_groups` - Sub-groups/jumuiya
- `officials` - Church officials

## Checking Database

Run the database check script to verify your database connection and view record counts:

```
bash
node check_db.js
```

## Building for Production

**Frontend:**
```
bash
cd src
npm run build
```

The built files will be in `src/dist`

## Technology Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Axios

### Backend
- Express.js
- PostgreSQL (pg)
- JWT (jsonwebtoken)
- Bcrypt
- CORS
- Dotenv

## Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running
- Check your database credentials in `.env`
- Verify the database `church_db` exists

### Port Already in Use
- Backend default port: 3001
- Frontend default port: 5173
- If ports are in use, you can change them in:
  - `server.js` for backend
  - `vite.config.ts` for frontend

### CORS Errors
- The backend is configured to allow CORS from:
  - `http://localhost:5173`
  - `http://localhost:5174`
  - `http://127.0.0.1:5173`
  - `http://127.0.0.1:5174`

## License

This project is for church use.
