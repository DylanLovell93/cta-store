//import express
const express = require('express');

//create our controller
const users = express.Router();

//routes

//new user route
users.post('/new', (req, res) => {
  res.send('new user route');
});

module.exports = { users };
