const { getDataJoin, create, update, remove, getData} = require('../base.service')
const path = require('path')
const knexPath = path.join(__dirname, '..', '..', 'db', 'knex.js')
const knex = require(knexPath)

const tableName = 'kehadiran'
const columnKehadiranId = 'id'

const getAllKehadiran = async (req, res, next) => {
    try {
        const kehadiranIds = await getData(tableName, columnKehadiranId)
        const result = await Promise.all(
            kehadiranIds.map( async (kehadiran) => {
                const kehadiranId = kehadiran.id
                const dataGuru = await getDataJoin('Kehadiran_guru as kg',
                    [{table: 'guru as g', firstKey: 'kg.guru_id', operator: '=', secondKey: 'g.id'}],
                    [ 'kg.kehadiran_id', 'g.id as guru_id', 'g.nama as guru_nama', 'kg.status'],
                    {'kg.kehadiran_id': kehadiranId}
                )
                
                const dataSantri = await getDataJoin('kehadiran_santri as ks',
                    [{table: 'santri as s', firstKey: 'ks.santri_id', operator: '=', secondKey: 's.id'}],
                    ['ks.kehadiran_id', 's.id as santri_id', 's.nama as santri_nama', 'ks.status'],
                    {'ks.kehadiran_id': kehadiranId}
                )
                
                return {
                    id: kehadiranId,
                    guru: dataGuru ? {
                        id: dataGuru.guru_id,
                        nama: dataGuru.guru_nama,
                        status: dataGuru.status
                    } : null,
                    santri: dataSantri.map(s => ({
                        id: s.santri_id,
                        nama: s.santri_nama,
                        status: s.status
                    }))
                }
            })
        )
        return res.status(200).json({
            status: 'success',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const getKehadiranById = async (req, res, next) => {
    try {
        const id = req.params.id
        const dataGuru = await getDataJoin('kehadiran_guru as kg', 
            [{table: 'guru as g', firstKey: 'kg.guru_id', operator: '=', secondKey: 'g.id'}], 
            ['kg.kehadiran_id','g.id as guru_id', 'g.nama as guru_nama', 'kg.status'], 
            {'kg.kehadiran_id': id}
        )
        
        const dataSantri = await getDataJoin(
            'kehadiran_santri as ks',
            [{table: 'santri as s', firstKey: 'ks.santri_id', operator: '=', secondKey: 's.id'}],
            ['ks.kehadiran_id', 's.id as santri_id', 's.nama as santri_nama', 'ks.status'],
            {'ks.kehadiran_id': id}
        )
        
        const result = {
            id: id,
            guru: dataGuru ? {
                id: dataGuru.guru_id,
                nama: dataGuru.guru_nama,
                status: dataGuru.status
            } : null,
            santri: dataSantri.map(s => ({
                id: s.santri_id,
                nama: s.santri_nama,
                status: s.status,
            }))
        }
        return res.status(200).json({
            status: 'success',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const createKehadiran = async (req, res, next) => {
    try {
        const {pertemuan_id, guru, santri} = req.body
        
        // Input validation
        if (!pertemuan_id || !guru || !santri || !Array.isArray(santri)) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid input data'
            })
        }

        const result = await knex.transaction(async (trx) => {
            const kehadiranIds = await create(tableName, {pertemuan_id: pertemuan_id}, trx)
            const kehadiranId = kehadiranIds[0]

            const createKehadiranGuru = await create('kehadiran_guru', {
                kehadiran_id: kehadiranId,
                guru_id: guru.id,
                status: guru.status
            }, trx)
            const santriData = santri.map((s) => ({ ...s, kehadiran_id: kehadiranId }))
            const createKehadiranSantri = await create('kehadiran_santri', santriData, trx)

            return {
                kehadiranId,
                kehadiran_guru: createKehadiranGuru,
                kehadiran_santri: createKehadiranSantri
            }
        })

        return res.status(201).json({
            status: 'success',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const updateKehadiran = async (req, res, next) => {
    try {
        const kehadiranId = req.params.id
        const {pertemuan_id, guru, santri} = req.body
        
        // Input validation
        if (!pertemuan_id || !guru || !santri || !Array.isArray(santri)) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid input data'
            })
        }

        // Update kehadiran records within a transaction
        const result = await knex.transaction(async (trx) => {
            const updateKehadiranGuru = await update('kehadiran_guru', 'kehadiran_id', kehadiranId, {
                guru_id: guru.id,
                status: guru.status
            }, trx)

            const santriUpdates = santri.map((s) =>
                update(
                    'kehadiran_santri',
                    'kehadiran_id',
                    kehadiranId,
                    { santri_id: s.id, status: s.status },
                    trx
                )
            )

            const updatedSantriRecords = await Promise.all(santriUpdates)

            return {
                kehadiran_guru: updateKehadiranGuru,
                kehadiran_santri: updatedSantriRecords
            }
        })

        return res.status(200).json({
            status: 'success',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const removeKehadiran = async (req, res, next) => {
    try {
        const id = req.params.id
        const deleted = await remove(tableName, columnKehadiranId, id)
        return res.status(200).json({
            status: 'success',
            message: 'delete data',
            deleted_row: deleted
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllKehadiran,
    getKehadiranById,
    createKehadiran,
    updateKehadiran,
    removeKehadiran
}
