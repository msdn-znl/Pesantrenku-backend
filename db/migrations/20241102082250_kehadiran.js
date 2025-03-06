/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  const tableStructure = (t) => {
    t.increments('id').primary()
    t.integer('pertemuan_id').unsigned().notNullable()
    t.foreign('pertemuan_id').references('id').inTable('pertemuan').onDelete('CASCADE').onUpdate('CASCADE')
    t.integer('santri_id').unsigned().notNullable()
    t.foreign('santri_id').references('id').inTable('santri').onDelete('CASCADE').onUpdate('CASCADE')
    t.enu('status', ['hadir','absen','izin'])
    t.timestamps(true, true, true)
  }
    return knex.schema.hasTable('kehadiran').then(function (exists){
    if (!exists) {
        return knex.schema.createTable('kehadiran', tableStructure)
    } else {
        return knex.schema.alterTable('kehadiran', tableStructure)
    }
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.hasTable('kehadiran').then(function (exists){
        if (exists){
            return knex.schema.dropTable('kehadiran')
        }
    })
};
