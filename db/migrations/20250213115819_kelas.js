/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    const tableStructure = (t) => {
      t.increments('id').primary()
      t.string('nama_kelas')
      t.enu('tipe_kelas', ['quran', 'madin'])
      t.integer('periode_id').unsigned().notNullable()
      t.foreign('periode_id').references('id').inTable('periode').onDelete('CASCADE')
      t.timestamps(true, true, true)
    }
      return knex.schema.hasTable('kelas').then(function (exists){
      if (!exists) {
          return knex.schema.createTable('kelas', tableStructure)
      } else {
          return knex.schema.alterTable('kelas', tableStructure)
      }
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
      return knex.schema.hasTable('kelas').then(function (exists){
          if (exists){
              return knex.schema.dropTable('kelas')
          }
      })
  };
  