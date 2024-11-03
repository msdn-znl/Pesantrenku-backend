const router = require('express').Router()
const {getAllPelajaran, getPelajaranById, createPelajaran, updatePelajaran, removePelajaran} = require('./pelajaran.controller')

router.get('/', getAllPelajaran)
    .post('/', createPelajaran)
router.route('/:id')
    .get(getPelajaranById)
    .put(updatePelajaran)
router.delete('/:id', removePelajaran)

module.exports = router