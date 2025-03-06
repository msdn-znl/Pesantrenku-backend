/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    const tableStructure = (t) => {
      t.increments('id').primary()
      t.integer('mapel_guru_kelas_id').unsigned().notNullable()
      t.foreign('mapel_guru_kelas_id').references('id').inTable('mapel_guru_kelas').onDelete('CASCADE')
      t.string('hari', 6).notNullable()
      t.time('jam_mulai', {precision: 4})
      t.time('jam_selesai', {precision: 4})
      t.integer('status', 1)
      t.timestamps(true, true, true)
    }
      return knex.schema.hasTable('jadwal_mengajar').then(function (exists){
      if (!exists) {
          return knex.schema.createTable('jadwal_mengajar', tableStructure)
      } else {
          return knex.schema.alterTable('jadwal_mengajar', tableStructure)
      }
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
      return knex.schema.hasTable('jadwal_mengajar').then(function (exists){
          if (exists){
              return knex.schema.dropTable('jadwal_mengajar')
          }
      })
  };
  