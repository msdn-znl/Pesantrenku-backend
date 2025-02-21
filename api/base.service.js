const path = require('path')
const knexPath = path.join(__dirname, '..', 'db', 'knex.js')
const knex = require(knexPath)
const errorPath = path.join(__dirname,'..','exception','error.js')
const {DatabaseError} = require(errorPath)

const getAll = async (tableName) => {
    try{
        const entry = await knex(tableName)
        return entry
    }catch(err){
        console.error('Database Error:',err)
        throw new DatabaseError('Failed to retrieve data from database')
    }
}

const getById = async (tableName, columnName, id) => {
    try{
        const entry = await knex(tableName).where(columnName, id)
        return entry
    }catch(err){
        console.error('Database Error:',err)
        throw new DatabaseError('Failed to retrieve data from database')
    }
}

const create = async (tableName, data) => {
    try{
        const entry = await knex(tableName).insert(data)
        return entry
    }catch(err){
        console.error('Database Error:',err)
        throw new DatabaseError('Failed to store data to database')
    }
}

const update = async (tableName, columnName, id, data) => {
    try{
        const entry = await knex(tableName).where(columnName, id).update({
            ...data,
            updatedAt: knex.fn.now(6)
        })
        return entry
    }catch(err){
        console.error('Database Error:',err)
        throw new DatabaseError('Failed to update data to database')
    }
}

const remove = async (tableName, columnName, id) => {
    try{
        const entry = await knex(tableName).where(columnName, id).del()
        if(!entry==0){
            return true
        }else{
            return false
        }
    }catch(err){
        console.error('Database Error:',err)
        throw new DatabaseError('Failed to remove data from database')
    }
}

const getByColumn = async (tableName, columnName) => {
    try {
        const entry = await knex(tableName).select(columnName)
        return entry
    } catch (error) {
        console.error('Database Error:',error)
        throw new DatabaseError('Failed to retrieve data from database')
    }
}

const getData = async (tableName, columnName, constraint) => {
    try {
        const data = await knex(tableName).select(columnName).where(constraint)
        return data
    } catch (error) {
        console.error('Database Error:',error)
        throw new DatabaseError('Failed to retrieve data from database')
    }
}

const getDataJoinTwoTable = async (mainTable, joinTable, {
    mainTableColumn, 
    operator = '=', 
    joinTableColumn, 
    constraint = null, 
    selectFields = []}) => {
    try {
        const entry = await knex(mainTable)
            .join(joinTable, mainTableColumn, operator, joinTableColumn)
            .select(selectFields).modify(query => {
                if (constraint) {
                    query.where(constraint)
                }
            })
        return entry``
    } catch (error) {
        console.error('Database Error:',error)
        throw new DatabaseError('Failed to retrieve data from database' + error.message)
    }
}

module.exports = {
    getAll,
    getById,
    getByColumn,
    getData,
    getDataJoinTwoTable,
    create,
    update,
    remove
}