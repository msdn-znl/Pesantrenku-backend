const router = require('express').Router()
const {getAllPertemuan, getPertemuanById, createPertemuan, updatePertemuan, removePertemuan} = require('./pertemuan.controller')
router.get('/', getAllPertemuan)
    .post('/create', createPertemuan)
router.route('/:id')
    .get(getPertemuanById)
    .put(updatePertemuan)
router.delete('/:id/remove', removePertemuan)

module.exports=router