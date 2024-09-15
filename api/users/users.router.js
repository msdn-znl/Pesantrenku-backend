const router = require('express').Router()
const {getAllUsers, getUserById, createUser, updateUser, removeUser} = require('./users.controller.js')

router.get('/', getAllUsers)
    .post('/create', createUser)
router.route('/:id')
    .get(getUserById)
    .post(updateUser)
router.delete('/:id/remove', removeUser)

module.exports = router