//import express
const express = require('express');

//import bcrypt
const bcrypt = require('bcrypt');

//create our controller
const users = express.Router();

//import queries
const { getUser, newUser, deleteUser, editUser } = require('../queries/users');

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

//edit user route (Update)
users.put('/', async (req, res) => {
  const { authkey, username, password } = req.body;
  const hashword = password ? await bcrypt.hash(password, 10) : null;
  const userInfo = { username: username.toLowerCase(), password: hashword };
  try {
    const editedUser = await editUser(authkey, userInfo);
    res.status(200).json({ success: true, payload: editedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, payload: 'error' });
  }
});

//delete user route (Delete)
users.delete('/', async (req, res) => {
  const { authkey } = req.body;
  try {
    const deletedUser = await deleteUser(authkey);
    res.status(200).json({
      success: true,
      payload: `User ${deletedUser.username} has been deleted.`,
    });
  } catch (error) {
    error.code === '22P02'
      ? res.status(500).json({ success: false, payload: `Invalid Auth` })
      : res.status(500).json({ success: false, payload: 'User not found' });
  }
});

//export
module.exports = users;
