const db = require('../utils/db');

module.exports = {
  all() {
    return db('customer')
      .join('address as a1', 'customer.address_id', 'a1.address_id')
      .select('customer.*', 'a1.address')
      .join('store', 'customer.store_id', 'store.store_id')
      .select('customer.*', 'a1.address', 'store.address_id')
      .join('address as a2', 'store.address_id', 'a2.address_id')
      .select('customer.*', 'a1.address', 'store.address_id as store_address_id', 'a2.address as store_address')
  },
  single(customer_id) {
    return db('customer')
      .where('customer_id', customer_id)
      .join('address as a1', 'customer.address_id', 'a1.address_id')
      .select('customer.*', 'a1.address')
      .join('store', 'customer.store_id', 'store.store_id')
      .select('customer.*', 'a1.address', 'store.address_id')
      .join('address as a2', 'store.address_id', 'a2.address_id')
      .select('customer.*', 'a1.address', 'store.address_id as store_address_id', 'a2.address as store_address')
  },
  add(data) {
    return db('customer')
      .insert(data)
  },
  update(customer_id, data) {
    return db('customer')
      .where('customer_id', customer_id)
      .update(data)
  },
  remove(customer_id) {
    return db('customer')
      .where('customer_id', customer_id)
      .del()
  }
};