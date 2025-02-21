const router = require('express').Router()
const {getAllKelas, getKelasById, createKelas, updateKelas, removeKelas}= require('./kelas.controller.js')

router.get('/', getAllKelas)
    .post('/create', createKelas)
router.route('/:id')
    .get(getKelasById)
    .put(updateKelas)
router.delete('/:id/remove', removeKelas)

module.exports=router