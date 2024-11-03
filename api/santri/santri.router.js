const router = require('express').Router()
const {getAllSantri, getSantriById, createSantri, updateSantri, removeSantri} = require('./santri.controller')

router.get('/', getAllSantri)
    .post('/', createSantri)
router.route('/:id')
    .get(getSantriById)
    .put(updateSantri)
router.delete('/:id', removeSantri)

module.exports = router