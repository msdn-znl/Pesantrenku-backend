/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    const tableStructure = (t) => {
      t.increments('id').primary()
      t.integer('kehadiran_id').unsigned().notNullable()
      t.foreign('kehadiran_id').references('id').inTable('kehadiran').onDelete('CASCADE')
      t.integer('santri_id').unsigned().notNullable()
      t.foreign('santri_id').references('id').inTable('santri')
      t.enu('status', ['hadir', 'izin', 'alpa'])
      t.timestamps(true, true, true)
    }
      return knex.schema.hasTable('kehadiran_santri').then(function (exists){
      if (!exists) {
          return knex.schema.createTable('kehadiran_santri', tableStructure)
      } else {
          return knex.schema.alterTable('kehadiran_santri', tableStructure)
      }
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
      return knex.schema.hasTable('kehadiran_santri').then(function (exists){
          if (exists){
              return knex.schema.dropTable('kehadiran_santri')
          }
      })
  };
  