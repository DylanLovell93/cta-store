//import express
const express = require('express');

//create our controller
const storeItems = express.Router();

//get all items
storeItems.get('/', (req, res) => {
  res.send('get all items route');
});

//add new item
storeItems.post('/', (req, res) => {
  res.send('add new item route');
});

//get one item
storeItems.get('/:id', (req, res) => {
  res.send('get one item route');
});

//delete one item
storeItems.delete('/:id', (req, res) => {
  res.send('delete one item route');
});

//edit one item
storeItems.put('/:id/edit', (req, res) => {
  res.send('edit one item route');
});

// export
module.exports = storeItems;
