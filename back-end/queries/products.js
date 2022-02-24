//import db
const db = require('../db/dbConfig');

const getAllProducts = async () => {
  try {
    const allProducts = await db.any('SELECT * FROM products');
    return allProducts;
  } catch (error) {
    throw error;
  }
};

const getOneProduct = async (id) => {
  try {
    const oneProduct = await db.one('SELECT * FROM products WHERE id=$1', id);
    return oneProduct;
  } catch (error) {
    throw error;
  }
};

const createProduct = async ({
  name,
  image,
  description,
  price,
  rating,
  featured,
}) => {
  const prodArr = [name, image, description, price, rating, featured];
  try {
    const newProduct = db.one(
      'INSERT INTO products (name, image, description, price, rating, featured) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      prodArr
    );
    return newProduct;
  } catch (error) {
    throw error;
  }
};

const deleteProduct = async (id) => {
  try {
    const deletedProduct = await db.one(
      'DELETE FROM products WHERE id=$1 RETURNING *',
      [id]
    );
    return deletedProduct;
  } catch (error) {
    throw error;
  }
};

const editProduct = async (
  id,
  { name, image, description, price, rating, featured }
) => {
  const prodArr = [name, image, description, price, rating, featured, id];
  try {
    const editedProduct = await db.one(
      'UPDATE products SET name=$1, image=$2, description=$3, price=$4, rating=$5, featured=$6 WHERE id=$7 RETURNING *',
      prodArr
    );
    return editedProduct;
  } catch (error) {
    throw error;
  }
};

//export queries
module.exports = {
  getAllProducts,
  getOneProduct,
  createProduct,
  deleteProduct,
  editProduct,
};
