const router = require('express').Router()
const {getAllSantriKelas, getSantriKelasById, createSantriKelas, updateSantriKelas, removeSantriKelas}= require('./santri_kelas.controller.js')

router.get('/', getAllSantriKelas)
    .post('/create', createSantriKelas)
router.route('/:id')
    .get(getSantriKelasById)
    .put(updateSantriKelas)
router.delete('/:id/remove', removeSantriKelas)

module.exports=router