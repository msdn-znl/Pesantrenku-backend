/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  const tableStructure = (t) => {
    t.increments('id').primary()
    t.string('pelajaranName',50).notNullable()
    t.integer('kelas_id').unsigned().notNullable()
    t.foreign('kelas_id').references('id').inTable('kelas').onDelete('CASCADE')
    t.timestamps(true, true, true)
  }
    return knex.schema.hasTable('pelajaran').then(function (exists){
    if (!exists) {
        return knex.schema.createTable('pelajaran', tableStructure)
    } else {
        return knex.schema.alterTable('pelajaran', tableStructure)
    }
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.hasTable('pelajaran').then(function (exists){
        if (exists){
            return knex.schema.dropTable('pelajaran')
        }
    })
};
