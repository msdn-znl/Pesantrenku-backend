const router = require('express').Router()
const {getAllJadwal, getJadwalById, createJadwal, updateJadwal, removeJadwal} = require('./jadwal.controller')
router.get('/', getAllJadwal)
    .post('/create', createJadwal)
router.route('/:id')
    .get(getJadwalById)
    .put(updateJadwal)
router.delete('/:id/remove', removeJadwal)

module.exports=router