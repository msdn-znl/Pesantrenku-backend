const router = require('express').Router()

const {getAllKehadiran, getKehadiranById, createKehadiran, updateKehadiran, removeKehadiran}= require('./kehadiran.controller')

router.get('/', getAllKehadiran)
    .post('/create', createKehadiran)
router.route('/:id')
    .get(getKehadiranById)
    .put(updateKehadiran)
router.delete('/:id/remove', removeKehadiran)
module.exports = router