// DEPENDENCIES
const cors = require('cors');
const express = require('express');
const users = require('./controllers/users');
const storeItems = require('./controllers/storeItems');

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json()); // Parse incoming JSON

//users controller
app.use('/users', users);

//admin controller
app.use('/items', storeItems);

// ROUTES
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// EXPORT
module.exports = app;
