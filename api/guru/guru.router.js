const router = require('express').Router()
const {getAllGuru, getGuruById, createGuru, updateGuru, removeGuru} = require('./guru.controller')

router.get('/', getAllGuru)

    .post('/create', createGuru)
router.route('/:id')
    .get(getGuruById)
    .put(updateGuru)
router.delete('/:id/remove', removeGuru)

module.exports = router