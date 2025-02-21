/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  const tableStructure = (t) => {
    t.increments('id').primary()
    t.string('username',50).notNullable()
    t.string('password').notNullable()
    t.enu('roles', ['admin', 'guru', 'santri']).notNullable()
    t.timestamps(true, true, true)
  }
    return knex.schema.hasTable('users').then(function (exists){
    if (!exists) {
        return knex.schema.createTable('users', tableStructure)
    } else {
        return knex.schema.alterTable('users', tableStructure)
    }
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.hasTable('users').then(function (exists){
        if (exists){
            return knex.schema.dropTable('users')
        }
    })
};
