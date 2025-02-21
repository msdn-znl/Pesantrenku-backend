const {getAll, getById, create, update, remove} = require('../base.service')

const tableName = 'pelajaran'
const columnName = 'id'

const getAllPelajaran = async (req, res, next) => {
    try{
        const kelas = await getAll(tableName)
        return res.status(200).json({
            status: 'success',
            data: kelas
        })
    }catch(err){
        next(err)
    }
}

const getPelajaranById = async(req, res, next) => {
    try{
        const kelasId = req.params.id
        const kelas = await getById(tableName, columnName, kelasId)
        return res.status(200).json({
            status: 'success',
            data: kelas
        })
    }catch(err){
        next(err)
    }
}

const createPelajaran = async (req, res, next) => {
    try {
        const namaPelajaran = req.body
        const kelas = await create(tableName, {
            nama_pelajaran: namaPelajaran
        })
        return res.status(200).json({
            status: 'success',
            data: kelas
        })
    } catch (error) {
        next(error)
    }
}

const updatePelajaran = async (req, res, next) => {
    try {
        const namaPelajaran = req.body
        const pelajaranId = req.params.id
        const kelas = await update(tableName, columnName, pelajaranId, {
            nama_pelajaran: namaPelajaran
        })
        return res.status(200).json({
            status: 'success',
            data: kelas
        })
    } catch (error) {
        next(error)
    }
}

const removePelajaran = async (req, res, next) => {
    try {
        const pelajaranId = req.params.id
        const result = await remove(tableName, columnName, pelajaranId)
        if(result){
            return res.status(200).json({
                status:'success'
            })
        }else{
            return res.status(404).json({
                status:'failed'
            })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllPelajaran,
    getPelajaranById,
    createPelajaran,
    updatePelajaran,
    removePelajaran
}