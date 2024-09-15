const {getAll, getById, create, update, remove} = require('./users.service')

const response = (res, statusCode, message, data) => {
    res.status(statusCode).json({message, data})
}

const getAllUsers = async (req, res, next) => {
    try{
        const users = await getAll()
        response(res, 200, 'success', users)
    }catch(err){
        next(err)
    }
}
const getUserById = async(req, res, next) => {
    try{
        const userId = req.params.id
        const user = await getById(userId)
        response(res, 200, 'success', user)
    }catch(err){
        next(err)
    }
}
const createUser = async(req, res, next) => {
    try{
        const {username, password} = req.body
        const user = await create({
            username: username,
            password: password
        })
        response(res, 200, 'success', user)
    }catch(err){
        next(err)
    }
}
const updateUser = async(req, res, next) => {
    try{
        const userId = req.params.id
        const {username, password} = req.body
        const user = await update(userId, {
            username: username,
            password: password
        })
        response(res, 200, 'success', user)
    }catch(err){
        next(err)
    }
}
const removeUser = async (req, res, next) => {
    try{
        const userId = req.params.id
        const result = await remove(userId)
        if(result){
            response(res, 200, "success")
        }else{
            response(res,404,'failed')
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