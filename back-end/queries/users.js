//import db
const db = require('../db/dbConfig');

const getUser = async (username) => {
  try {
    const user = await db.one(
      'SELECT * FROM users WHERE username=$1',
      username.toLowerCase()
    );
    return user;
  } catch (error) {
    throw error;
  }
};

const newUser = async ({ username, password }) => {
  const userArr = [username, password];
  try {
    const user = await db.one(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      userArr
    );
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = { getUser, newUser };
