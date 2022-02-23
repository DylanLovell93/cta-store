//import express
const express = require('express');

//create our controller
const products = express.Router();

//import queries
const {
  getAllProducts,
  getOneProduct,
  createProduct,
  deleteProduct,
  editProduct,
} = require('../queries/products');

const { getUserByAuth } = require('../queries/users');

//get all items
products.get('/', async (req, res) => {
  try {
    const allProducts = await getAllProducts();
    res.status(200).json({ success: true, payload: allProducts });
  } catch (error) {
    res.status(500).json({ success: false, payload: 'error' });
  }
});

//add new item
products.post('/', async (req, res) => {
  const input = req.body;
  const { authkey } = req.body;
  try {
    const user = await getUserByAuth(authkey);
    if (user.admin) {
      const newProduct = await createProduct(input);
      res.status(200).json({ success: true, payload: newProduct });
    } else {
      res.status(500).json({ success: false, payload: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ success: false, payload: 'error' });
  }
});

//get one item
products.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const targetProduct = await getOneProduct(id);
    res.status(200).json({ success: true, payload: targetProduct });
  } catch (error) {
    res.status(500).json({ success: false, payload: 'error' });
  }
});

//delete one item
products.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { authkey } = req.body;
  try {
    const user = await getUserByAuth(authkey);
    if (user.admin) {
      const deletedProduct = await deleteProduct(id);
      res.status(200).json({ success: true, payload: deletedProduct });
    } else {
      res.status(500).json({ success: false, payload: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ success: false, payload: 'error' });
  }
});

//edit one item
products.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { authkey } = req.body;
  const input = req.body;
  try {
    const user = await getUserByAuth(authkey);
    if (user.admin) {
      const editedProduct = await editProduct(id, input);
      res.status(200).json({ success: true, payload: editedProduct });
    } else {
      res.status(500).json({ success: false, payload: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ success: false, payload: 'error' });
  }
});

// export
module.exports = products;
