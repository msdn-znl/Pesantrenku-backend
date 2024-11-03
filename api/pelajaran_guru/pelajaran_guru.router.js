const router = require('express').Router()
const {getAllPelajaranGuru, getPelajaranGuruById, createPelajaranGuru, updatePelajaranGuru, removePelajaranGuru} = require('./pelajaran_guru.controller')

router.get('/', getAllPelajaranGuru)
    .post('/', createPelajaranGuru)
router.route('/:id')
    .get(getPelajaranGuruById)
    .put(updatePelajaranGuru)
router.delete('/:id', removePelajaranGuru)

module.exports = router