/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    const tableStructure = (t) => {
      t.increments('id').primary()
      t.integer('kehadiran_id').unsigned().notNullable()
      t.foreign('kehadiran_id').references('id').inTable('kehadiran').onDelete('CASCADE')
      t.integer('guru_id').unsigned().notNullable()
      t.foreign('guru_id').references('id').inTable('guru')
      t.enu('status', ['hadir', 'izin', 'alpa'])
      t.timestamps(true, true, true)
    }
      return knex.schema.hasTable('kehadiran_guru').then(function (exists){
      if (!exists) {
          return knex.schema.createTable('kehadiran_guru', tableStructure)
      } else {
          return knex.schema.alterTable('kehadiran_guru', tableStructure)
      }
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
      return knex.schema.hasTable('kehadiran_guru').then(function (exists){
          if (exists){
              return knex.schema.dropTable('kehadiran_guru')
          }
      })
  };
  