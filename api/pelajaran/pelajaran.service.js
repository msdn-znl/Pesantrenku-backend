const path = require('path')
const knexPath = path.join(__dirname, '..', '..', 'db', 'knex.js')
const knex = require(knexPath)

const getAll = async () => {
    const pelajaran = await knex('pelajaran')
    return pelajaran
}
const getById = async (pelajaranId) => {
    const pelajaran = await knex('pelajaran').where('id', pelajaranId)
    return pelajaran
}
const create = async (pelajaranData) => {
    const pelajaran = await knex('pelajaran').insert(pelajaranData)
    return pelajaran
}
const update = async (pelajaranId, pelajaranData) => {
    const pelajaran = await knex('pelajaran').where('id', pelajaranId).update({
        pelajaranName: pelajaranData.pelajaranName,
        updatedAt: knex.fn.now(6)
    })
    return pelajaran
}
const remove = async (pelajaranId) => {
    const pelajaran = await knex('pelajaran').where('id', pelajaranId).del()
    if(!pelajaran==0){
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