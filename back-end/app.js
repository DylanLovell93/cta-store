// DEPENDENCIES
const cors = require('cors');
const express = require('express');
const users = require('./controllers/users');
const products = require('./controllers/products');

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json()); // Parse incoming JSON

//users controller
app.use('/users', users);

//admin controller
app.use('/products', products);

// ROUTES
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// EXPORT
module.exports = app;
