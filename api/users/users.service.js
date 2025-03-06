const path = require('path')
const knexPath = path.join(__dirname, '..', '..', 'db', 'knex.js')
const knex = require(knexPath)
const errorPath = path.join(__dirname,'..','..','exception','error.js')
const {DatabaseError} = require(errorPath)

const getByUsername = async(username) => {
    try{
        const user = await knex('users').select('username','password','roles').where({username})
        return user.length > 0 ? user[0] : null;
    }catch(err){
        console.error('Database Error:', err)
        throw new DatabaseError('Failed to retrieve users from database')
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



module.exports = {
    getByUsername,
    update
}