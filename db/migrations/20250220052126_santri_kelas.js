/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    const tableStructure = (t) => {
      t.increments('id').primary()
      t.integer('santri_id').unsigned().notNullable()
      t.foreign('santri_id').references('id').inTable('santri').onDelete('CASCADE')
      t.integer('kelas_id').unsigned().notNullable()
      t.foreign('kelas_id').references('id').inTable('kelas').onDelete('CASCADE')
      t.integer('periode_id').unsigned().notNullable()
      t.foreign('periode_id').references('id').inTable('periode')
      t.timestamps(true, true, true)
    }
      return knex.schema.hasTable('santri_kelas').then(function (exists){
      if (!exists) {
          return knex.schema.createTable('santri_kelas', tableStructure)
      } else {
          return knex.schema.alterTable('santri_kelas', tableStructure)
      }
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
      return knex.schema.hasTable('santri_kelas').then(function (exists){
          if (exists){
              return knex.schema.dropTable('santri_kelas')
          }
      })
  };
  