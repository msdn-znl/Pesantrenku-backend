const {getAll, getById, create, update, remove} = require('./pelajaran_guru.service')
const response = (res, statusCode, message, data) => {
  res.status(statusCode).json({message, data})
}

const getAllPelajaranGuru = async(req, res, next) => {
  try{
    const pelajaranGuru = await getAll()
    response(res, 200, 'success', pelajaranGuru)
  }catch(err){
    next(err)
  }
}
const getPelajaranGuruById = async(req, res, next) =>{
  try{
    const pelajaranGuruId= req.params.id
    const pelajaran = await getById(pelajaranGuruId)
    response(res, 200, 'success', pelajaran)
  }catch(err){
    next(err)
  }
}
const createPelajaranGuru = async(req, res, next) => {
  try{
    const {guruId, pelajaranId, kelasId} = req.body
    const createdPelajaran = create(guruId, pelajaranId, kelasId)
    response(res, 200, 'success', createdPelajaran)
  }catch(err){
    next(err)
  }
}
const updatePelajaranGuru = async(req, res, next) => {
  try{
    const pelajaranGuruId = req.params.id
    const {guruId, pelajaranId, kelasId} = req.body
    const pelajaran = await update(pelajaranGuruId, guruId, pelajaranId, kelasId)
    response(res, 200, 'success', pelajaran)
  }catch(err){
    next(err)
  }
}
const removePelajaranGuru = async(req, res, next) => {
  try{
    const pelajaranGuruId = req.params.id
    const result = await remove(pelajaranGuruId)
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
  getAllPelajaranGuru,
  getPelajaranGuruById,
  createPelajaranGuru,
  updatePelajaranGuru,
  removePelajaranGuru
}