// src/models/user.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Create a new user
const createUser = async (email, password) => {
    const result = await pool.query(
        'INSERT INTO Users (email, password) VALUES ($1, $2) RETURNING *',
        [email, password]
    );
    return result.rows[0];
};

// Find a user by email
const findUserByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM Users WHERE email = $1', [email]);
    return result.rows[0];
};

// Find a user by ID
const findUserById = async (id) => {
    const result = await pool.query('SELECT * FROM Users WHERE id = $1', [id]);
    return result.rows[0];
};

// Update API Key for a user
const updateUserApiKey = async (id, apiKey) => {
    const result = await pool.query(
        'UPDATE Users SET apiKey = $1 WHERE id = $2 RETURNING *',
        [apiKey, id]
    );
    return result.rows[0];
};

module.exports = { createUser, findUserByEmail, findUserById, updateUserApiKey };
