/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    const tableStructure = (t) => {
      t.increments('id').primary()
      t.integer('pelajaran_id').unsigned().notNullable()
      t.foreign('pelajaran_id').references('id').inTable('pelajaran').onDelete('CASCADE')
      t.integer('guru_id').unsigned().notNullable()
      t.foreign('guru_id').references('id').inTable('guru').onDelete('CASCADE')
      t.integer('kelas_id').unsigned().notNullable()
      t.foreign('kelas_id').references('id').inTable('kelas').onDelete('CASCADE')
      t.timestamps(true, true, true)
    }
      return knex.schema.hasTable('mapel_guru_kelas').then(function (exists){
      if (!exists) {
          return knex.schema.createTable('mapel_guru_kelas', tableStructure)
      } else {
          return knex.schema.alterTable('mapel_guru_kelas', tableStructure)
      }
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
      return knex.schema.hasTable('mapel_guru_kelas').then(function (exists){
          if (exists){
              return knex.schema.dropTable('mapel_guru_kelas')
          }
      })
  };
  