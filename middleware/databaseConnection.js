const { Pool } = require('pg');
require('dotenv').config();
console.log("Process env: ", "User: ", process.env.DB_USER,
  "Host: ", process.env.DB_HOST,
  "Database Name: ", process.env.DB_NAME,
  "Pasword: ", process.env.DB_PASSWORD,
   "Port: ", process.env.DB_PORT,
 "SSL: ", process.env.DB_SSL
);
const pool = new Pool({
  user: process.env.DB_USER, // Your database username
  host: process.env.DB_HOST, // Your RDS instance endpoint
  database: process.env.DB_NAME, // Your database name
  password: process.env.DB_PASSWORD, // Your database password
  port: process.env.DB_PORT || 5432, // PostgreSQL default port
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false, // Disable SSL for local connections
});

const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log('Connected to Postgre SQL Database');
    client.release(); // Release the client back to the pool
  } catch (err) {
    console.error('Database connection error:', err.message);
  }
};

module.exports = { pool, connectDB };