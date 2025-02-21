const {getAll, getById, create, update, remove} = require('../base.service')

const tableName = 'santri_kelas'
const columnId = 'id'

const getAllSantriKelas = async (req, res, next) => {
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

const getSantriKelasById = async (req, res, next) => {
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

const createSantriKelas = async (req, res, next) => {
    try {
        const {santriId, kelasId, periodeId} = req.body
        const created = await create(tableName, {
            santri_id: santriId,
            kelas_id: kelasId,
            periode_id: periodeId
        })
        return res.status(201).json({
            status: 'success',
            data: created
        })
    } catch (error) {
        next(error)
    }
}

const updateSantriKelas = async (req, res, next) => {
    try {
        const id = req.params.id
        const {santriId, kelasId, periodeId} = req.body
        const updated = await update(tableName, columnId, id, {
            santri_id: santriId,
            kelas_id: kelasId,
            periode_id: periodeId
        })
        return res.status(200).json({
            status: 'success',
            data: updated
        })
    } catch (error) {
        next(error)
    }
}

const removeSantriKelas = async (req, res, next) => {
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
    getAllSantriKelas, 
    getSantriKelasById, 
    createSantriKelas, 
    updateSantriKelas, 
    removeSantriKelas
}