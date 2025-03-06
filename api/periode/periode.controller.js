const {getAll, getById, create, update, remove}=require('../base.service')

const tableName = 'periode'
const columnName = 'id'

const getAllPeriode = async(req, res, next) => {
    try{
        const periode = await getAll(tableName)
        return res.status(200).json({
            status: 'success',
            data: periode
        })
    }catch(err){
        console.error(err)
        next(err)
    }
}

const getPeriodeById = async(req, res, next) => {
    try {
        const id = req.params.id
        const periode = await getById(tableName, columnName, id)
        return res.status(200).json({
            status: 'success',
            data: periode
        })
    } catch (error) {
        next(error)
    }
}

const createPeriode = async (req, res, next) => {
    try {
        const {periode, isActive} = req.body
        const created = await create(tableName, {
            periode : periode,
            is_active: isActive
        })
        return res.status(201).json({
            status: 'success',
            data: created
        })
    } catch (error) {
        next(error)
    }
}

const updatePeriode = async(req, res, next) => {
    try {
        const id = req.params.id
        const {periode, isActive}= req.body
        const updated = await update(tableName, columnName, id, {
            periode: periode,
            is_active: isActive
        })
        return res.status(200).json({
            status: 'success',
            affected_row: updated
        })
    } catch (error) {
        next(error)
    }
}

const removePeriode = async(req, res, next) => {
    try {
        const id = req.params.id
        const deleted = await remove(tableName, columnName, id)
        return res.status(200).json({
            status: 'success',
            deleted_row: deleted
        })
    } catch (error) {
        next(error)
    }
}
module.exports={
    getAllPeriode,
    getPeriodeById,
    createPeriode,
    updatePeriode,
    removePeriode
}