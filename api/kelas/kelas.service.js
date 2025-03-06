const path = require('path')
const knexPath = path.join(__dirname, '..', '..', 'db', 'knex.js')
const knex = require(knexPath)

const getAll = async () => {
    const kelas = await knex('kelas')
    return kelas
}
const getById = async (kelasId) => {
    const kelas = await knex('kelas').where('id', kelasId)
    return kelas
}
const create = async (kelasData) => {
    const kelas = await knex('kelas').insert(kelasData)
    return kelas
}
const update = async (kelasId, kelasData) => {
    const kelas = await knex('kelas').where('id', kelasId).update({
        kelasName: kelasData.kelasName,
        updatedAt: knex.fn.now(6)
    })
    return kelas
}
const remove = async (kelasId) => {
    const kelas = await knex('kelas').where('id', kelasId).del()
    if(!kelas==0){
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