const path = require('path')
const knexPath = path.join(__dirname, '..', '..', 'db', 'knex.js')
const knex = require(knexPath)

const getAll = async () => {
    const pelajaranGuru = await knex('pelajaran_guru').select(
        'pelajaran_guru.id as id',
        'guru.id as guru_id',
        'guru.guruName as nama_guru',
        'pelajaran.id as pelajaran_id',
        'pelajaran.pelajaranName as nama_pelajaran',
        'kelas.id as kelas_id',
        'kelas.kelasName as kelas_name',
        'pelajaran_guru.createdAt',
        'pelajaran_guru.updatedAt'
    ).leftJoin('guru', 'pelajaran_guru.id', 'guru.id')
    .leftJoin('pelajaran', 'pelajaran_guru.pelajaran_id', 'pelajaran.id')
    .leftJoin('kelas', 'pelajaran_guru.kelas_id', 'kelas.id')
    return pelajaranGuru
}
const getById = async (pelajaranGuruId) => {
    const pelajaranGuru = await knex('pelajaran_guru').where('id', pelajaranGuruId)
    return pelajaranGuru
}
const create = async (guruId, pelajaranId, kelasId) => {
    const pelajaranGuru = await knex('pelajaran_guru').insert({
      guru_id : guruId,
      pelajaran_id : pelajaranId,
      kelas_id : kelasId
    })
    return pelajaranGuru
}
const update = async (pelajaranGuruId, guruId, pelajaranId, kelasId) => {
    const pelajaranGuru = await knex('pelajaran_guru').where('id', pelajaranGuruId).update({
      guru_id : guruId,
      pelajaran_id : pelajaranId,
      kelas_id : kelasId,
      updatedAt: knex.fn.now(6)
    })
    return pelajaranGuru
}
const remove = async (pelajaranId) => {
    const pelajaranGuru = await knex('pelajaran_guru').where('id', pelajaranId).del()
    if(pelajaranGuru !== 0){
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