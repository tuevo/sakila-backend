const db = require('../utils/db');

module.exports = {
  all() {
    return db('customer')
      .join('address', 'customer.address_id', 'address.address_id')
      .select('customer.*', 'address.address')
  }
};