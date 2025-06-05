// src/app.js
const express = require('express');
const translateRoute = require('./routes/TranslateRoute');
const authRoutes = require('./routes/authRoutes');
const hbs = require('hbs');   // Import handlebars (hbs)
const path = require('path');
const cookieParser = require('cookie-parser'); // Import cookie-parser


const cors = require('cors');  // Import cors middleware

const app = express();
app.use(cors());  // Enable CORS
app.options('*', cors());  // Preflight request handling

app.use(express.json()); // In case of JSON request bodies
app.use(express.urlencoded({ extended: true })); // Handle form data

app.use(express.static(path.join(__dirname, '../public'))); // Serve static files


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views')); // Set views folder
app.use(cookieParser()); // Add cookie-parser middleware


// Use the translate route
app.use('/api', translateRoute);
app.use('/', authRoutes); // New authentication routes



module.exports = app;
