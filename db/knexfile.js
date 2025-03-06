// Update with your config settings.
const config = require('../config/index').db
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql',
    connection: config,
    migrations: {
      tableName: 'knex_migrations',
      directory: 'migrations'
    }
  },

  staging: {
    client: 'mysql',
    connection: config,
    migrations: {
      tableName: 'knex_migrations',
      directory: 'migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: config,
    migrations: {
      tableName: 'knex_migrations',
      directory: 'migrations'
    }
  }

};
