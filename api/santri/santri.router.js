const router = require('express').Router()
const {getAllSantri, getSantriById, createSantri, updateSantri, removeSantri}= require('./santri.controller.js')

router.get('/', getAllSantri)
    .post('/create', createSantri)
router.route('/:id')
    .get(getSantriById)
    .put(updateSantri)
router.delete('/:id/remove', removeSantri)

module.exports=router