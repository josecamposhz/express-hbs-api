const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

const pool = isProduction ?
    new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    }) :
    new Pool({
        user: "postgres",
        host: "localhost",
        password: "postgres",
        database: "tasks",
        port: 5432,
    });

module.exports = pool;