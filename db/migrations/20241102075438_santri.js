/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  const tableStructure = (t) => {
    t.increments('id').primary()
    t.string('santriName',255).notNullable()
    t.integer('kelas_id').unsigned().notNullable()
    t.foreign('kelas_id').references('id').inTable('kelas').onDelete('CASCADE').onUpdate('CASCADE')
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
