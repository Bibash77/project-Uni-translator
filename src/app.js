// src/app.js
const express = require('express');
const translateRoute = require('./routes/TranslateRoute');
const cors = require('cors');  // Import cors middleware

const app = express();
app.use(cors());  // Enable CORS
app.options('*', cors());  // Preflight request handling

app.use(express.json()); // In case of JSON request bodies

// Use the translate route
app.use('/api', translateRoute);


module.exports = app;
