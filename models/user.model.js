const db = require('../utils/db');

module.exports = {
  async add(data) {
    const ids = await db('users').insert(data);
    return ids[0];
  },
  async singleById(id) {
    const users = await db('users').where('id', id);
    return users[0];
  },
  async singleByUsername(username) {
    const users = await db('users').where('username', username);
    return users[0];
  },
  async isDuplicateByUsername(username) {
    const users = await db('users').where('username', username);
    return users.length > 0;
  }
};