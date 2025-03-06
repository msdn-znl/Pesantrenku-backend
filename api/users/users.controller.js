const bcrypt = require('bcrypt')
const {getByUsername, update} = require('./users.service')
const {getAll, getById, create, remove} = require('../base.service')
// eslint-disable-next-line no-unused-vars
const {BadRequestError, NotFoundError, UnauthorizedError} = require('../../exception/error')
// const response = (res, statusCode, message, data) => {
//     res.status(statusCode).json({message, data})
// }

//nama tabel
const tableName = 'users'
const columnName = 'id'

const getAllUsers = async (req, res, next) => {
    try{
        const users = await getAll(tableName)
        return res.status(200).json({
            status: 'success',
            data: users
        })
    }catch(err){
        next(err)
    }
}
const getUserById = async(req, res, next) => {
    try{
        const userId = req.params.id
        const user = await getById(tableName, columnName, userId)
        return res.status(200).json({
            status: 'success',
            data: user
        })
    }catch(err){
        next(err)
    }
}
const createUser = async(req, res, next) => {
    try{
        const {username, password, role} = req.body
        const isUserExist = await getByUsername(username)
        if (isUserExist){
            return res.status(409).json({
                status: 'fail',
                message: 'username already in use'
            })
        }
        const hashPass = await bcrypt.hashSync(password, 10)
        const validRoles = ['admin', 'guru', 'santri']
        if (!validRoles.includes(role)){
            return res.status(400).json({
                status: 'failed',
                message:'invalid roles'
            })
        }
        const user = await create(tableName, {
            username: username,
            password: hashPass,
            roles: role
        })
        return res.status(201).json({
            status:'success',
            data: user
        })
    }catch(err){
        next(err)
    }
}
const updateUser = async(req, res, next) => {
    try{
        const userId = req.params.id
        const {username, password} = req.body
        const isUserExist = await getByUsername(username)
        if (isUserExist){
            return res.status(409).json({
                status: 'fail',
                message: 'username already in use'
            })
        }
        const hashPass = await bcrypt.hashSync(password, 10)
        const user = await update(userId, {
            username: username,
            password: hashPass
        })
        return res.status(200).json({
            status: 'success',
            data: user
        })
    }catch(err){
        next(err)
    }
}
const removeUser = async (req, res, next) => {
    try{
        const userId = req.params.id
        const result = await remove(tableName, columnName, userId)
        if(result){
            return res.status(200).json({
                status:'success'
            })
        }else{
            return res.status(404).json({
                status:'failed'
            })
        }
    }catch(err){
        next(err)
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    removeUser
}