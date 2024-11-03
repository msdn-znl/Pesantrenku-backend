/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  const tableStructure = (t) => {
    t.increments('id').primary()
    t.string('guruName',50).notNullable()
    t.timestamps(true, true, true)
  }
    return knex.schema.hasTable('guru').then(function (exists){
    if (!exists) {
        return knex.schema.createTable('guru', tableStructure)
    } else {
        return knex.schema.alterTable('guru', tableStructure)
    }
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.hasTable('guru').then(function (exists){
        if (exists){
            return knex.schema.dropTable('guru')
        }
    })
};
