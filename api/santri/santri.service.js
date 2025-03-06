const path = require('path')
const knexPath = path.join(__dirname, '..', '..', 'db', 'knex.js')
const knex = require(knexPath)

const getAll = async () => {
    const santri = await knex('santri')
    return santri
}
const getById = async (santriId) => {
    const santri = await knex('santri').where('id', santriId)
    return santri
}
const create = async (santriData) => {
    const santri = await knex('santri').insert(santriData)
    return santri
}
const update = async (santriId, santriData) => {
    const santri = await knex('santri').where('id', santriId).update({
        santriName: santriData.santriName,
        updatedAt: knex.fn.now(6)
    })
    return santri
}
const remove = async (santriId) => {
    const santri = await knex('santri').where('id', santriId).del()
    if(!santri==0){
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