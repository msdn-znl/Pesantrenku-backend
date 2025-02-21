/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    const tableStructure = (t) => {
      t.increments('id').primary()
      t.string('nama',50).notNullable()
      t.string('nomor_induk_guru', 50).notNullable()
      t.string('nomor_telepon', 20).notNullable()
      t.string('status', 50).notNullable()
      t.integer('users_id').unsigned().notNullable()
      t.foreign('users_id').references('id').inTable('users').onDelete('CASCADE')
      t.timestamps(true, true, true)
    }
      return knex.schema.hasTable('guru').then(function (exists){
      if (!exists) {
          return knex.schema.createTable('guru', tableStructure)
      } else {
          return knex.schema.alterTable('guru', tableStructure)
      }
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
      return knex.schema.hasTable('guru').then(function (exists){
          if (exists){
              return knex.schema.dropTable('guru')
          }
      })
  };
  