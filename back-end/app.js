// DEPENDENCIES
const cors = require('cors');
const express = require('express');
const { users } = require('./controllers/users');

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json()); // Parse incoming JSON
app.use('/users', users);

// ROUTES
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// EXPORT
module.exports = app;
