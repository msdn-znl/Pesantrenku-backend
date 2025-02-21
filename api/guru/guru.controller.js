const {getAll, getById, create, update, remove} = require('../base.service')

const tableName = 'guru'
const columnName = 'id'

const getAllGuru = async (req, res, next) => {
    try {
        const guru = await getAll(tableName)
        return res.status(200).json({
            status: 'success',
            data: guru
        })
    } catch (error) {
        next(error)
    }
}

const getGuruById = async (req, res, next) => {
    try {
        const id = req.params.id
        const guru = await getById(tableName, columnName, id)
        return res.status(200).json({
            status: 'success',
            data: guru
        })
    } catch (error) {
        next(error)
    }
}

const createGuru = async (req, res, next) => {
    try {
        const {nama, nomorIndukGuru, nomorTelepon, status, usersId} = req.body
        const created = await create(tableName, {
            nama: nama,
            nomor_induk_guru: nomorIndukGuru,
            nomor_telepon: nomorTelepon,
            status: status,
            users_id: usersId
        })
        return res.status(201).json({
            status: 'success',
            data: created
        })
    } catch (error) {
        next(error)
    }
}

const updateGuru = async (req, res, next) => {
    try {
        const id = req.params.id
        const {nama, nomorIndukGuru, nomorTelepon, status} = req.body
        const updated = await update(tableName, columnName, id, {
            nama: nama,
            nomor_induk_guru: nomorIndukGuru,
            nomor_telepon: nomorTelepon,
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

const removeGuru = async (req, res, next) => {
    try {
        const id = req.params.id
        const deleted = await remove(tableName, columnName, id)
        return res.status(200).json({
            status: 'success',
            deleted_row : deleted
        })
    } catch (error) {
        next(error)
    }
}

module.exports ={
    getAllGuru,
    getGuruById,
    createGuru,
    updateGuru,
    removeGuru
}