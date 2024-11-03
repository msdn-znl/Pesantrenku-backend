const {getAll, getById, create, update, remove} = require('./santri.service')
const response = (res, statusCode, message, data) => {
  res.status(statusCode).json({message, data})
}

const getAllSantri = async(req, res, next) => {
  try{
    const santri = await getAll()
    response(res, 200, 'success', santri)
  }catch(err){
    next(err)
  }
}
const getSantriById = async(req, res, next) =>{
  try{
    const santriId= req.params.id
    const result = await getById(santriId)
    response(res, 200, 'success', result)
  }catch(err){
    next(err)
  }
}
const createSantri = async(req, res, next) => {
  try{
    const {santriName, kelasId} = req.body
    const santri = create(santriName, kelasId)
    response(res, 200, '200', santri)
  }catch(err){
    next(err)
  }
}
const updateSantri = async(req, res, next) => {
  try{
    const santriId = req.params.id
    const {santriName, kelasId} = req.body
    const result = await update(santriId, santriName, kelasId)
    response(res, 200, 'success', result)
  }catch(err){
    next(err)
  }
}
const removeSantri = async(req, res, next) => {
  try{
    const santriId = req.params.id
    const result = await remove(santriId)
    if(result){
      response(res, 200, "success")
    }else{
      response(res,404,'failed')
    }
  }catch(err){
    next(err)
  }
}

module.exports = {
  getAllSantri,
  getSantriById,
  createSantri,
  updateSantri,
  removeSantri
}