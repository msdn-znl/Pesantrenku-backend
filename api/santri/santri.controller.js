const {getAll, getById, create, update, remove} = require('../base.service')

const tableName = 'santri'
const columnName = 'id'

const getAllSantri = async (req, res, next) => {
    try {
        const santri = await getAll(tableName)
        return res.status(200).json({
            status: 'success',
            data: santri
        })
    } catch (error) {
        next(error)
    }
}

const getSantriById = async (req, res, next) => {
    try {
        const id = req.params.id
        const santri = await getById(tableName, columnName, id)
        return res.status(200).json({
            status: 'success',
            data: santri
        })
    } catch (error) {
        next(error)
    }
}

const createSantri = async (req, res, next) => {
    try {
        const {nama, nomorIndukSantri, tahunMasuk, tahunKeluar, nomorTelepon, status, kelas, tempatLahir, tanggalLahir, kamar, usersId} = req.body
        const created = await create(tableName, {
            nama: nama,
            nomor_induk_santri: nomorIndukSantri,
            tahun_masuk: tahunMasuk,
            tahun_keluar: tahunKeluar,
            nomor_telepon: nomorTelepon,
            status: status,
            kelas: kelas,
            tempat_lahir: tempatLahir,
            tanggal_lahir: tanggalLahir,
            kamar: kamar,
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

const updateSantri = async (req, res, next) => {
    try {
        const id = req.params.id
        const {nama, nomorIndukSantri, tahunMasuk, tahunKeluar, nomorTelepon, status, kelas, tempatLahir, tanggalLahir, kamar, usersId} = req.body
        const updated = await update(tableName, columnName, id, {
            nama: nama,
            nomor_induk_santri: nomorIndukSantri,
            tahun_masuk: tahunMasuk,
            tahun_keluar: tahunKeluar,
            nomor_telepon: nomorTelepon,
            status: status,
            kelas: kelas,
            tempat_lahir: tempatLahir,
            tanggal_lahir: tanggalLahir,
            kamar: kamar,
            users_id: usersId
        })
        return res.status(200).json({
            status: 'success',
            data: updated
        })
    } catch (error) {
        next(error)
    }
}

const removeSantri = async (req, res, next) => {
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


module.exports = {
    getAllSantri,
    getSantriById,
    createSantri,
    updateSantri,
    removeSantri
}