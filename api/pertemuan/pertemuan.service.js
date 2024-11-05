const path = require('path')
const knexPath = path.join(__dirname, '..', '..', 'db', 'knex.js')
const knex = require(knexPath)

const getAll = async () => {
    const pertemuan = await knex('pertemuan')
    return pertemuan
}
const getById = async (pertemuanId) => {
    const pertemuan = await knex('pertemuan').where('id', pertemuanId)
    return pertemuan
}
const create = async (pelajaranGuruId, waktuPertemuan, jurnalData) => {
    const pertemuan = await knex('pertemuan').insert({
        pelajaran_guru_id: pelajaranGuruId,
        datetime: waktuPertemuan,
        jurnal: jurnalData
    })
    return pertemuan
}
const update = async (pertemuanId, pelajaranGuruId, waktuPertemuan, jurnalData) => {
    const pertemuan = await knex('pertemuan').where('id', pertemuanId).update({
      pelajaran_guru_id: pelajaranGuruId,
      datetime: waktuPertemuan,
      jurnal: jurnalData,
      updatedAt: knex.fn.now(6)
    })
    return pertemuan
}
const remove = async (pertemuanId) => {
    const pertemuan = await knex('pertemuan').where('id', pertemuanId).del()
    if(pertemuan !== 0){
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