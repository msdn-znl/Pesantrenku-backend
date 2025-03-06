const {getAll, getById, create, update, remove} = require('../base.service')

const tableName = 'jadwal_mengajar'
const columnId = 'id'

const getAllJadwal = async (req, res, next) => {
    try {
        const result = await getAll(tableName)
        return res.status(200).json({
            status: 'success',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const getJadwalById = async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await getById(tableName, columnId, id)
        return res.status(200).json({
            status: 'success',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const createJadwal = async (req, res, next) => {
    try {
        const {mapelGuruKelasId, hari, jamMulai, jamSelesai, status} = req.body
        const created = await create(tableName, {
            mapel_guru_kelas_id: mapelGuruKelasId,
            hari: hari,
            jam_mulai: jamMulai,
            jam_selesai: jamSelesai,
            status: status
        })
        return res.status(201).json({
            status: 'success',
            data: created
        })
    } catch (error) {
        next(error)
    }
}

const updateJadwal = async (req, res, next) => {
    try {
        const id = req.params.id
        const {mapelGuruKelasId, hari, jamMulai, jamSelesai, status} = req.body
        const updated = await update(tableName, columnId, id, {
            mapel_guru_kelas_id: mapelGuruKelasId,
            hari: hari,
            jam_mulai: jamMulai,
            jam_selesai: jamSelesai,
            status: status
        })
        return res.status(200).json({
            status: 'success',
            data: updated
        })
    } catch (error) {
        next(error)
    }
}

const removeJadwal = async (req, res, next) => {
    try {
        const id = req.params.id
        const deleted = await remove(tableName, columnId, id)
        return res.status(200).json({
            status: 'success',
            deleted_row : deleted
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllJadwal, 
    getJadwalById, 
    createJadwal, 
    updateJadwal, 
    removeJadwal
}