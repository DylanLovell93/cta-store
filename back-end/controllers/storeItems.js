//import express
const express = require('express');

//create our controller
const storeItems = express.Router();

//get all items
storeItems.get('/', (req, res) => {
  res.send('get all items route');
});

//get one item
storeItems.get('/:id', (req, res) => {
  res.send('get one item route');
});

// export
module.exports = storeItems;
