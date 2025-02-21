const {getAll, getById, create, update, remove} = require('../base.service')

const tableName = 'pertemuan'
const columnId = 'id'

const getAllPertemuan = async (req, res, next) => {
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

const getPertemuanById = async (req, res, next) => {
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

const createPertemuan = async (req, res, next) => {
    try {
        const {mapelGuruKelasId, tanggal, jurnalMengajar} = req.body
        const created = await create(tableName, {
            mapel_guru_kelas_id: mapelGuruKelasId,
            tanggal: tanggal,
            jurnal_mengajar: jurnalMengajar
        })
        return res.status(201).json({
            status: 'success',
            data: created
        })
    } catch (error) {
        next(error)
    }
}

const updatePertemuan = async (req, res, next) => {
    try {
        const id = req.params.id
        const {mapelGuruKelasId, tanggal, jurnalMengajar} = req.body
        const updated = await update(tableName, columnId, id, {
            mapel_guru_kelas_id: mapelGuruKelasId,
            tanggal: tanggal,
            jurnal_mengajar: jurnalMengajar
        })
        return res.status(200).json({
            status: 'success',
            data: updated
        })
    } catch (error) {
        next(error)
    }
}

const removePertemuan = async (req, res, next) => {
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
    getAllPertemuan, 
    getPertemuanById, 
    createPertemuan, 
    updatePertemuan, 
    removePertemuan
}