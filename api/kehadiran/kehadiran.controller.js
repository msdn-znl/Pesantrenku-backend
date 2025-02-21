const {getByColumn, getDataJoinTwoTable, create, update, remove, withTransaction} = require('../base.service')

const tableName = 'kehadiran'
const columnKehadiranId = 'id'

const getAllKehadiran = async (req, res, next) => {
    try {
        const kehadiranIds = await getByColumn(tableName, columnKehadiranId)
        const result = await Promise.all(
            kehadiranIds.map( async (kehadiran) => {
                const kehadiranId = kehadiran.id
                const dataGuru = await getDataJoinTwoTable('kehadiran_guru as kg', 'guru as g', 
                    {mainTableColumn: 'kg.guru_id', operator: '=', joinTableColumn: 'g.id', 
                        selectFields: ['kg.kehadiran_id','g.id as guru_id', 'g.nama as guru_nama', 'kg.status'], constraint: {'kg.kehadiran_id': kehadiranId}
                    }
                )
                const dataSantri = await getDataJoinTwoTable('kehadiran_santri as ks', 'santri as s',
                    {mainTableColumn: 'ks.santri_id', operator: '=', joinTableColumn: 's.id', 
                        selectFields: ['ks.kehadiran_id', 's.id as santri_id', 's.nama as santri_nama', 'ks.status'], constraint: {'ks.kehadiran_id': kehadiranId}
                    }
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
        const dataGuru = await getDataJoinTwoTable('kehadiran_guru as kg', 'guru as g', 
            {mainTableColumn: 'kg.guru_id', operator: '=', joinTableColumn: 'g.id', 
                selectFields: ['kg.kehadiran_id','g.id as guru_id', 'g.nama as guru_nama', 'kg.status'], constraint: {'kg.kehadiran_id': id}})
        const dataSantri = await getDataJoinTwoTable('kehadiran_santri as ks', 'santri as s',
            {mainTableColumn: 'ks.santri_id', operator: '=', joinTableColumn: 's.id', 
                selectFields: ['ks.kehadiran_id', 's.id as santri_id', 's.nama as santri_nama', 'ks.status'], constraint: {'ks.kehadiran_id': id}
            }
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
        const {guru, santri} = req.body
        
        // Input validation
        if (!guru || !santri || !Array.isArray(santri)) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid input data'
            })
        }

        // Create kehadiran records within a transaction
        const result = await withTransaction(async (trx) => {
            const kehadiranGuru = await create('kehadiran_guru', {
                guru_id: guru.id,
                status: guru.status
            }, trx)

            const createdSantriRecords = []
            for (const element of santri) {
                const record = await create('kehadiran_santri', {
                    santri_id: element.id,
                    status: element.status
                }, trx)
                createdSantriRecords.push(record)
            }

            return {
                kehadiran_guru: kehadiranGuru,
                kehadiran_santri: createdSantriRecords
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
        const {guru, santri} = req.body
        
        // Input validation
        if (!guru || !santri || !Array.isArray(santri)) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid input data'
            })
        }

        // Update kehadiran records within a transaction
        const result = await withTransaction(async (trx) => {
            const updateKehadiranGuru = await update('kehadiran_guru', 'kehadiran_id', kehadiranId, {
                guru_id: guru.id,
                status: guru.status
            }, trx)

            const updatedSantriRecords = []
            for (const element of santri) {
                const record = await update('kehadiran_santri', 'kehadiran_id', kehadiranId, {
                    santri_id: element.id,
                    status: element.status
                }, trx)
                updatedSantriRecords.push(record)
            }

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
