const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  ssl: true
  // ssl: false,
});

module.exports = pool;
