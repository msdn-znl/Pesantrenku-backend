const router = require('express').Router()
const {getAllGuru, getGuruById, createGuru, updateGuru, removeGuru} = require('./guru.controller')

router.get('/', getAllGuru)
    .post('/', createGuru)
router.route('/:id')
    .get(getGuruById)
    .put(updateGuru)
router.delete('/:id', removeGuru)

module.exports = router