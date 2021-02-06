const { Client } = require('pg');

require('dotenv').config();

const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
});

client.
    .connect()
    .then(() => console.log ('connect'))
    .catch(err => console.error('connection error', err.stack))

module.exports = client;