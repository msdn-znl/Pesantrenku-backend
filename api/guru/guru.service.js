const path = require('path')
const knexPath = path.join(__dirname, '..', '..', 'db', 'knex.js')
const knex = require(knexPath)

const getAll = async () => {
    const guru = await knex('guru')
    return guru
}
const getById = async (guruId) => {
    const guru = await knex('guru').where('id', guruId)
    return guru
}
const create = async (guruData) => {
    const guru = await knex('guru').insert(guruData)
    return guru
}
const update = async (guruId, guruData) => {
    const guru = await knex('guru').where('id', guruId).update({
        guruName: guruData.guruName,
        updatedAt: knex.fn.now(6)
    })
    return guru
}
const remove = async (guruId) => {
    const guru = await knex('guru').where('id', guruId).del()
    if(!guru==0){
        return true
    }else{
        return false
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}