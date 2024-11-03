const router = require('express').Router()
const {getAllKelas, getKelasById, createKelas, updateKelas, removeKelas} = require('./kelas.controller')

router.get('/', getAllKelas)
    .post('/', createKelas)
router.route('/:id')
    .get(getKelasById)
    .put(updateKelas)
router.delete('/:id', removeKelas)

module.exports = router