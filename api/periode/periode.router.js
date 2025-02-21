const router = require('express').Router()
const {getAllPeriode, getPeriodeById, createPeriode, updatePeriode, removePeriode}= require('./periode.controller.js')

router.get('/', getAllPeriode)
    .post('/create', createPeriode)
router.route('/:id')
    .get(getPeriodeById)
    .put(updatePeriode)
router.delete('/:id/remove', removePeriode)

module.exports=router