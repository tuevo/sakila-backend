const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'sakila',
    port: 3306
  },
  pool: {
    min: 0,
    max: 50
  },
  useNullAsDefault: true
});

module.exports = knex;