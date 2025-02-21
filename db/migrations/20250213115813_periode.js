/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    const tableStructure = (t) => {
      t.increments('id').primary()
      t.string('periode',20)
      t.integer('is_active',1)
      t.timestamps(true, true, true)
    }
      return knex.schema.hasTable('periode').then(function (exists){
      if (!exists) {
          return knex.schema.createTable('periode', tableStructure)
      } else {
          return knex.schema.alterTable('periode', tableStructure)
      }
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
      return knex.schema.hasTable('periode').then(function (exists){
          if (exists){
              return knex.schema.dropTable('periode')
          }
      })
  };
  