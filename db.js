require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool ({
    user: "postgres",
    password: process.env.DATABASE_PASSWORD,
    database: "beauty_room",
    host: "localhost",
    port: 5432
});

pool.connect();

module.exports = pool;