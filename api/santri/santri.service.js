const path = require('path')
const knexPath = path.join(__dirname, '..', '..', 'db', 'knex.js')
const knex = require(knexPath)

const getAll = async () => {
    const santri = await knex('santri')
    .select(
        'santri.id as id',
        'santri.santriName',
        'kelas.id as kelas_id',
        'kelas.kelasName as kelas_name',
        'santri.createdAt',
        'santri.updatedAt'
    )
    .leftJoin('kelas', 'santri.kelas_id', 'kelas.id')
    return santri
}
const getById = async (santriId) => {
    const santri = await knex('santri').select(
    'santri.id as id',
    'santri.santriName',
    'kelas.id as kelas_id',
    'kelas.kelasName as kelas_name',
    'santri.createdAt',
    'santri.updatedAt'
    )
    .leftJoin('kelas', 'santri.kelas_id', 'kelas.id')
    .where('id', santriId)
    return santri
}
const create = async (santriName, kelasId) => {
    const santri = await knex('santri').insert({
        santriName:santriName,
        kelas_id:kelasId
      })
    return santri
}
const update = async (santriId, santriData, kelasId) => {
    const santri = await knex('santri').where('id', santriId).update({
        santriName: santriData,
        kelas_id: kelasId,
        updatedAt: knex.fn.now(6)
    })
    return santri
}
const remove = async (santriId) => {
    const santri = await knex('santri').where('id', santriId).del()
    if(santri !== 0){
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