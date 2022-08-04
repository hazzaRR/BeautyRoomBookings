require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool ({
    user: "beautyroom",
    password: process.env.DATABASE_PASSWORD,
    database: "beautyroom",
    host: "db",
    port: 5432
});

pool.connect();

module.exports = pool;