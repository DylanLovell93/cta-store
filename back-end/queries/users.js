//import db
const db = require('../db/dbConfig');

const getUser = ({ username }) => {
  try {
    const user = db.one(
      'SELECT * FROM users WHERE username=$1',
      username.toLowerCase()
    );
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = { getUser };
