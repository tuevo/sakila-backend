# Sakila Backend 🚀
A web service server built with NodeJS.

## Configure DB Connection
Using MySQL database.

`utils/db.js`

  ```js
  const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host: HOST_IP,
      user: ROOT_USERNAME,
      password: ROOT_PASSWORD,
      database: DB_NAME,
      port: PORT
    },
    pool: {
      min: MIN_POOL,
      max: MAX_POOL
    },
    useNullAsDefault: true
  });

  module.exports = knex;
  ```


