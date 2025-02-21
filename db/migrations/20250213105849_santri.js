/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    const tableStructure = (t) => {
      t.increments('id').primary()
      t.string('nama').notNullable()
      t.string('nomor_induk_santri', 50).nullable()
      t.integer('tahun_masuk', 4)
      t.integer('tahun_keluar', 4)
      t.string('nomor_telepon', 20)
      t.string('status', 50)
      t.string('tempat_lahir', 20)
      t.date('tanggal_lahir')
      t.string('kamar', 20)
      t.integer('users_id').unsigned().notNullable()
      t.foreign('users_id').references('id').inTable('users').onDelete('CASCADE')
      t.timestamps(true, true, true)
    }
      return knex.schema.hasTable('santri').then(function (exists){
      if (!exists) {
          return knex.schema.createTable('santri', tableStructure)
      } else {
          return knex.schema.alterTable('santri', tableStructure)
      }
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
      return knex.schema.hasTable('santri').then(function (exists){
          if (exists){
              return knex.schema.dropTable('santri')
          }
      })
  };
  