// src/routes/authRoutes.js
const express = require('express');
const { signup, login, dashboard } = require('../controllers/authcontroller');
const jwt = require('jsonwebtoken');
const { findUserById } = require('../models/user');
const router = express.Router();

// Middleware to authenticate JWT
const authenticate = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.redirect('/login');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await findUserById(decoded.id);
        next();
    } catch (error) {
        res.redirect('/login');
    }
};

// Routes
router.get('/', (req, res) => res.render('home')); // Home page
router.get('/signup', (req, res) => res.render('signup'));
router.post('/signup', signup);

router.get('/login', (req, res) => res.render('login'));
router.post('/login', login);

router.get('/dashboard', authenticate, dashboard);

module.exports = router;
