//import express
const express = require('express');

//create our controller
const users = express.Router();

//import queries
const { getUser } = require('../queries/users');

//routes

//new user route
users.post('/', (req, res) => {
  res.send('new user route');
});

//user login route
users.get('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const targetUser = await getUser(username);
    const { authkey } = targetUser;
    targetUser.password === password
      ? res.status(200).json({ success: true, payload: { authkey } })
      : res
          .status(500)
          .json({ success: false, payload: 'invalid username / password' });
  } catch {
    res.status(500).json({ success: false, payload: 'error' });
  }
});

//export
module.exports = users;
