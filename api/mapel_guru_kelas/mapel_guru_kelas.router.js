const router = require('express').Router()
const {getAllMapelGuruKelas,
    getMapelGuruKelasById,
    createMapelGuruKelas,
    updateMapelGuruKelas,
    removeMapelGuruKelas} = require('./mapel_guru_kelas.controller')

router.get('/', getAllMapelGuruKelas)
    .post('/create', createMapelGuruKelas)
router.route('/:id')
    .get(getMapelGuruKelasById)
    .put(updateMapelGuruKelas)
router.delete('/:id/remove', removeMapelGuruKelas)

module.exports=router