// src/routes/translateRoute.js
const express = require('express');
const router = express.Router();
const { translateText } = require('../controllers/TranslateController');

router.get('/translate', translateText);

module.exports = router;
