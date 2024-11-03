const router = require('express').Router()
const {getAllPelajaran, getPelajaranById, createPelajaran, updatePelajaran, removePelajaran} = require('./pelajaran.controller')

router.get('/', getAllPelajaran)
    .post('/create', createPelajaran)
router.route('/:id')
    .get(getPelajaranById)
    .put(updatePelajaran)
router.delete('/:id/remove', removePelajaran)

module.exports = router