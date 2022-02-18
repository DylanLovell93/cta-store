//import express
const express = require('express');

//create our controller
const users = express.Router();

//routes

//new user route
users.post('/', (req, res) => {
  res.send('new user route');
});

//user login route
users.get('/login', (req, res) => {
  res.send('user login route');
});

//export
module.exports = users;
