const {getAll, getById, create, update, remove} = require('../base.service')

const tableName = 'mapel_guru_kelas'
const columnId = 'id'

const getAllMapelGuruKelas = async (req, res, next) => {
    try{
        const result = await getAll(tableName)
        return res.status(200).json({
            status: 'success',
            data: result
        })
    }catch(err){
        next(err)
    }
}

const getMapelGuruKelasById = async(req, res, next) => {
    try{
        const mapelGuruKelasId = req.params.id
        const result = await getById(tableName, columnId, mapelGuruKelasId)
        return res.status(201).json({
            status: 'success',
            data: result
        })
    }catch(err){
        next(err)
    }
}

const createMapelGuruKelas = async (req, res, next) => {
    try {
        const {pelajaranId, guruId, kelasId} = req.body
        const result = await create(tableName, {
            pelajaran_id: pelajaranId,
            guru_id: guruId,
            kelas_id: kelasId 
        })
        return res.status(200).json({
            status: 'success',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const updateMapelGuruKelas = async (req, res, next) => {
    try {
        const {pelajaranId, guruId, kelasId} = req.body
        const mapelGuruKelasId = req.params.id
        const result = await update(tableName, columnId, mapelGuruKelasId, {
            npelajaran_id: pelajaranId,
            guru_id: guruId,
            kelas_id: kelasId 
        })
        return res.status(200).json({
            status: 'success',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const removeMapelGuruKelas = async (req, res, next) => {
    try {
        const mapelGuruKelasId = req.params.id
        const result = await remove(tableName, columnId, mapelGuruKelasId)
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
    getAllMapelGuruKelas,
    getMapelGuruKelasById,
    createMapelGuruKelas,
    updateMapelGuruKelas,
    removeMapelGuruKelas
}