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
    if (error.code === 0) {
      throw 'User not found';
    } else {
      throw error;
    }
  }
};

const getUserByAuth = async (authkey) => {
  try {
    const user = await db.one('SELECT * FROM users WHERE authkey=$1', authkey);
    return user;
  } catch (error) {
    throw error;
  }
};

const newUser = async ({ username, password }) => {
  const userArr = [username.toLowerCase(), password];
  try {
    const user = await db.one(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      userArr
    );
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteUser = async (authkey) => {
  try {
    const deletedUser = await db.one(
      'DELETE FROM users WHERE authkey=$1 RETURNING *',
      authkey
    );
    return deletedUser;
  } catch (error) {
    throw error;
  }
};

const editUser = async (authkey, { username, password }) => {
  const nameQuery = await db.any(
    'SELECT * FROM users WHERE username=$1',
    username
  )[0];
  const queryArr = [username, password || nameQuery?.password, authkey];
  const validName = nameQuery?.authkey === authkey || !nameQuery ? true : false;
  try {
    return validName
      ? await db.one(
          'UPDATE users SET username=$1, password=$2 WHERE authkey=$3 RETURNING *',
          queryArr
        )
      : 'Name is taken';
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { getUser, getUserByAuth, newUser, deleteUser, editUser };
