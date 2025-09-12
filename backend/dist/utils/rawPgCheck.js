"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});
client.connect(err => {
    if (err) {
        console.error('❌ Error de conexión con PG:', err.message);
    }
    else {
        console.log('✅ Conexión directa con PG establecida');
        client.end();
    }
});
