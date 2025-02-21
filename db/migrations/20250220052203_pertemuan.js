/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    const tableStructure = (t) => {
      t.increments('id').primary()
      t.integer('mapel_guru_kelas_id').unsigned().notNullable()
      t.foreign('mapel_guru_kelas_id').references('id').inTable('mapel_guru_kelas').onDelete('CASCADE')
      t.date('tanggal').notNullable()
      t.text('jurnal_mengajar', ['text'])
      t.timestamps(true, true, true)
    }
      return knex.schema.hasTable('pertemuan').then(function (exists){
      if (!exists) {
          return knex.schema.createTable('pertemuan', tableStructure)
      } else {
          return knex.schema.alterTable('pertemuan', tableStructure)
      }
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
      return knex.schema.hasTable('pertemuan').then(function (exists){
          if (exists){
              return knex.schema.dropTable('pertemuan')
          }
      })
  };
  