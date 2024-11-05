const router = require('express').Router()
const {getAllPertemuan, getPertemuanById, createPertemuan, updatePertemuan, removePertemuan} = require('./pertemuan.controller')

router.get('/', getAllPertemuan)
    .post('/', createPertemuan)
router.route('/:id')
    .get(getPertemuanById)
    .put(updatePertemuan)
router.delete('/:id', removePertemuan)

module.exports = router