const {getAll, getById, create, update, remove} = require('../base.service')

const tableName = 'kelas'
const columnName = 'id'

const getAllKelas = async (req, res, next) => {
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
const getKelasById = async(req, res, next) => {
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

const createKelas = async (req, res, next) => {
    try {
        const {namaKelas, tipeKelas, periodeId} = req.body
        const validClassType = ['madin', 'quran']
        if (!validClassType.includes(tipeKelas)) {
            return res.status(400).json({
                status: 'failed',
                message: 'invalid tipe kelas'
            })
        }
        const kelas = await create(tableName, {
            nama_kelas: namaKelas,
            tipe_kelas: tipeKelas,
            periode_id: periodeId
        })
        return res.status(201).json({
            status: 'success',
            data: kelas
        })
    } catch (error) {
        next(error)
    }
}

const updateKelas = async (req, res, next) => {
    try {
        const kelasId = req.params.id
        const {namaKelas, tipeKelas, periodeId} = req.body
        const validClassType = ['madin', 'quran']
        if (!validClassType.includes(tipeKelas)) {
            return res.status(400).json({
                status: 'failed',
                message: 'invalid tipe kelas'
            })
        }
        const kelas = await update(tableName, columnName, kelasId, {
            nama_kelas: namaKelas,
            tipe_kelas: tipeKelas,
            periode_id: periodeId
        })
        return res.status(200).json({
            status: 'success',
            data: kelas
        })
    } catch (error) {
        next(error)
    }
}

const removeKelas = async (req, res, next) => {
    try {
        const kelasId = req.params.id
        const result = await remove(tableName, columnName, kelasId)
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
    getAllKelas,
    getKelasById,
    createKelas,
    updateKelas,
    removeKelas
}