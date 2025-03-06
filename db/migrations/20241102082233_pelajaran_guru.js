/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  const tableStructure = (t) => {
    t.increments('id').primary()
    t.integer('guru_id').unsigned().notNullable()
    t.foreign('guru_id').references('id').inTable('guru').onDelete('CASCADE').onUpdate('CASCADE')
    t.integer('pelajaran_id').unsigned().notNullable()
    t.foreign('pelajaran_id').references('id').inTable('pelajaran').onDelete('CASCADE').onUpdate('CASCADE')
    t.integer('kelas_id').unsigned().notNullable()
    t.foreign('kelas_id').references('id').inTable('kelas').onDelete('CASCADE').onUpdate('CASCADE')
    t.timestamps(true, true, true)
  }
    return knex.schema.hasTable('pelajaran_guru').then(function (exists){
    if (!exists) {
        return knex.schema.createTable('pelajaran_guru', tableStructure)
    } else {
        return knex.schema.alterTable('pelajaran_guru', tableStructure)
    }
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.hasTable('pelajaran_guru').then(function (exists){
        if (exists){
            return knex.schema.dropTable('pelajaran_guru')
        }
    })
};
