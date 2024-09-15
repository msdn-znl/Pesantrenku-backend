const path = require('path')
const knexPath = path.join(__dirname, '..', '..', 'db', 'knex.js')
const knex = require(knexPath)

const getAll = async () => {
    const users = await knex('users')
    return users
}
const getById = async (userId) => {
    const user = await knex('users').where('id', userId)
    return user
}
const create = async (userData) => {
    const user = await knex('users').insert(userData)
    return user
}
const update = async (userId, userData) => {
    const user = await knex('users').where('id', userId).update({
        username: userData.username,
        password: userData.password,
        updatedAt: knex.fn.now(6)
    })
    return user
}
const remove = async (userId) => {
    const user = await knex('users').where('id', userId).del()
    if(!user==0){
        return true
    }else{
        return false
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}