// src/controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { findUserByEmail, createUser, updateUserApiKey } = require('../models/user');

// Generate API Key
const generateApiKey = () => crypto.randomBytes(32).toString('hex');

// Signup logic
exports.signup = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.render('signup', { error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await createUser(email, hashedPassword);

        res.redirect('/login');
    } catch (error) {
        console.error('Signup error:', error);
        res.render('signup', { error: 'An error occurred. Please try again.' });
    }
};

// Login logic
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.render('login', { error: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token).redirect('/dashboard');
    } catch (error) {
        console.error('Login error:', error);
        res.render('login', { error: 'An error occurred. Please try again.' });
    }
};

// Dashboard logic to generate and display API key
exports.dashboard = async (req, res) => {
    try {
        const user = req.user;

        if (!user.apiKey) {
            const apiKey = generateApiKey();
            await updateUserApiKey(user.id, apiKey);
            user.apiKey = apiKey;
        }

        res.render('dashboard', { email: user.email, apiKey: user.apiKey });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.redirect('/login');
    }
};
