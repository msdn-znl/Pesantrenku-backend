const path = require('path')
const knexPath = path.join(__dirname, '..', 'db', 'knex.js')
const knex = require(knexPath)
const errorPath = path.join(__dirname,'..','exception','error.js')
const {DatabaseError} = require(errorPath)

/**
 * Mengambil semua data dari tabel
 * @param {string} tableName - Nama tabel yang akan diambil datanya
 * @returns {Promise<Object[]>} -Data hasil query
 */
const getAll = async (tableName) => {
    try{
        const entry = await knex(tableName)
        return entry
    }catch(err){
        console.error('Database Error:',err)
        throw new DatabaseError('Failed to retrieve data from database')
    }
}

/**
 * Mengambil data berdasarkan ID
 * @param {string} tableName - 
 * @param {string} columnName 
 * @param {string} id 
 * @returns 
 */
const getById = async (tableName, columnName, id) => {
    try{
        const entry = await knex(tableName).where(columnName, id)
        return entry
    }catch(err){
        console.error('Database Error:',err)
        throw new DatabaseError('Failed to retrieve data from database')
    }
}

/**
 * Menambahkan data ke dalam Tabel
 * @param {string} tableName - Nama Tabel yang akan dimasukkan data 
 * @param {<Object{}>} data - Data yang dimasukkan ke database, dalam format key-pair "nama kolom":"data"
 * @param {*} trx - database transaction support(opsional)
 * @returns {Promise<Object[]>} - Data hasil query
 */
const create = async (tableName, data, trx = null) => {
    try{
        const query = trx ? trx(tableName) : knex(tableName)
        const entry = await query.insert(data)
        return entry
    }catch(err){
        console.error('Database Error:',err)
        throw new DatabaseError('Failed to store data to database')
    }
}

/**
 * Mengedit data yang ada di database berdasarkan ID
 * @param {*} tableName - Nama tabel yang akan diedit datanya
 * @param {string} columnName - Nama Kolom id di tabel
 * @param {string} id -  ID dari data yang akan diupdate 
 * @param {<object{}>} data - Data yang diedit ke database, dalam format key-pair "nama kolom":"data"
 * @param {*} trx - database transaction support(opsional)
 * @returns {Promise<Object[]>} - Data hasil query 
 */
const update = async (tableName, columnName, id, data, trx = null) => {
    try{
        const query = trx ? trx(tableName) : knex(tableName)
        const entry = await query.where(columnName, id).update({
            ...data,
            updatedAt: knex.fn.now(6)
        })
        return entry
    }catch(err){
        console.error('Database Error:',err)
        throw new DatabaseError('Failed to update data to database')
    }
}

/**
 * Menghapus data di database berdasarkan
 * @param {string} tableName - Nama tabel ayng akan dihapus datanya
 * @param {string} columnName - Nama Kolom id di tabel
 * @param {string} id -  ID dari data yang akan diupdate 
 * @param {*} trx - database transaction support(opsional)
 * @returns {boolean} - Data hasil query
 */
const remove = async (tableName, columnName, id, trx = null) => {
    try{
        const query = trx ? trx(tableName) : knex(tableName)
        const entry = await query.where(columnName, id).del()
        if(!entry>0){
            return true
        }else{
            return false
        }
    }catch(err){
        console.error('Database Error:',err)
        throw new DatabaseError('Failed to remove data from database')
    }
}

/**
 * Ambil data dari tabel dengan kondisi yang bisa ditentukan
 * @param {string} tableName - Nama tabel yang diambil datanya
 * @param {Array<string>} columnName - Array dari nama kolom yang ada di tabel
 * @param {Object} constraint - Filter untuk where condition
 * @returns {Promise<Object[]>} - Data hasil query
 */
const getData = async (tableName, columnName, constraint) => {
    try {
        const query = knex(tableName).select(columnName)
        query.modify(q => {
            if (Object.keys(constraint).length>0) {
                q.where(constraint)
            }
        })
        const entry = await query
        return entry
    } catch (error) {
        console.error('Database Error:',error)
        throw new DatabaseError('Failed to retrieve data from database')
    }
}

/**
 * Ambil data dengan join antar tabel
 * @param {string} mainTable - Nama tabel utama
 * @param {Array<{table: string, firstKey: string, operator?: string, secondKey: string}>} joins - Array join table
 * @param {string[]} selects - Kolom yang akan diambil
 * @param {Object} constraint - Filter untuk where condition
 * @returns {Promise<Object[]>} - Data hasil query
 */
const getDataJoin = async (mainTable, joins =[], selects =[], constraint = {}) => {
    try {
        let query = knex(mainTable)
        joins.forEach(join => {
            if (!join.table || !join.firstKey || !join.secondKey) {
                throw new Error('Parameter join memerlukan table, firstKey, dan secondKey dalam format object')
            }
            query = query.join(join.table, join.firstKey, join.operator, join.secondKey)
        })
        query = query.select(selects.length ? selects : '*')
        query.modify(q => {
            if (Object.keys(constraint).length>0) {
                q.where(constraint)
            }
        })
        const entry = await query
        return entry
    } catch (error) {
        console.error('Database Error:',error)
        throw new DatabaseError('Failed to retrieve data from database' + error.message)
    }
}

module.exports = {
    getAll,
    getById,
    getData,
    getDataJoin,
    create,
    update,
    remove
}