/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  const tableStructure = (t) => {
    t.increments('id').primary()
    t.integer('pelajaran_guru_id').unsigned().notNullable()
    t.foreign('pelajaran_guru_id').references('id').inTable('pelajaran_guru').onDelete('CASCADE').onUpdate('CASCADE')
    t.datetime('datetime', {precision: 6}).defaultTo(knex.fn.now(6))
    t.text('jurnal')
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
