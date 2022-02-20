//import express
const express = require('express');

//import bcrypt
const bcrypt = require('bcrypt');

//create our controller
const users = express.Router();

//import queries
const { getUser, newUser } = require('../queries/users');

//routes

//new user route (Create)
users.post('/', async (req, res) => {
  const { username, password } = req.body;
  const hashword = await bcrypt.hash(password, 10);
  try {
    const existingUser = await getUser(username);
    res.status(500).json({ payload: 'Name is taken' });
  } catch (error) {
    const addedUser = await newUser({ username, password: hashword });
    res.status(200).json({ success: true, payload: addedUser });
  }
});

//user login route (Read)
users.get('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const targetUser = await getUser(username);
    const { authkey } = targetUser;
    (await bcrypt.compare(password, targetUser.password))
      ? res.status(200).json({ success: true, payload: { authkey } })
      : res.status(500).json({ success: false, payload: 'Invalid password' });
  } catch (error) {
    res.status(500).json({ success: false, payload: error });
  }
});

//export
module.exports = users;
