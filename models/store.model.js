const db = require('../utils/db');

module.exports = {
  all() {
    return db('store')
      .join('address', 'store.address_id', 'address.address_id')
      .select('store.*', 'address.address');
  }
};