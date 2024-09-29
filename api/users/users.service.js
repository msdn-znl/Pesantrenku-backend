const path = require('path')
const knexPath = path.join(__dirname, '..', '..', 'db', 'knex.js')
const knex = require(knexPath)
const errorPath = path.join(__dirname,'..','..','exception','error.js')
const {DatabaseError} = require(errorPath)

const getAll = async () => {
    try{
        const users = await knex('users')
        return users
    }catch(err){
        console.error('Database Error:',err)
        throw new DatabaseError('Failed to retrieve users from database')
    }
}
const getById = async (userId) => {
    try{
        const user = await knex('users').where('id', userId)
        return user
    }catch(err){
        console.error('Database Error:',err)
        throw new DatabaseError('Failed to retrieve user from database')
    }
}
const create = async (userData) => {
    try{
        const user = await knex('users').insert(userData)
        return user
    }catch(err){
        console.error('Database Error:',err)
        throw new DatabaseError('Failed to store user to database')
    }
}
const update = async (userId, userData) => {
    try{
        const user = await knex('users').where('id', userId).update({
            username: userData.username,
            password: userData.password,
            updatedAt: knex.fn.now(6)
        })
        return user
    }catch(err){
        console.error('Database Error:',err)
        throw new DatabaseError('Failed to store user to database')
    }
}
const remove = async (userId) => {
    try{
        const user = await knex('users').where('id', userId).del()
        if(!user==0){
            return true
        }else{
            return false
        }
    }catch(err){
        console.error('Database Error:',err)
        throw new DatabaseError('Failed to remove user from database')
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}