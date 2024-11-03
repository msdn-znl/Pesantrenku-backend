const {getAll, getById, create, update, remove} = require('./kelas.service')
const response = (res, statusCode, message, data) => {
  res.status(statusCode).json({message, data})
}

const getAllKelas = async(req, res, next) => {
  try{
    const kelas = await getAll()
    response(res, 200, 'success', kelas)
  }catch(err){
    next(err)
  }
}
const getKelasById = async(req, res, next) =>{
  try{
    const kelasId= req.params.getById
    const kelas = await getById(kelasId)
    response(res, 200, 'success', kelas)
  }catch(err){
    next(err)
  }
}
const createKelas = async(req, res, next) => {
  try{
    const {kelasName} = req.body
    const kelas = create(kelasName)
    response(res, 200, '200', kelas)
  }catch(err){
    next(err)
  }
}
const updateKelas = async(req, res, next) => {
  try{
    const kelasId = req.params.id
    const {kelasName} = req.body
    const kelas = await update(kelasId, kelasName)
    response(res, 200, 'success', kelas)
  }catch(err){
    next(err)
  }
}
const removeKelas = async(req, res, next) => {
  try{
    const kelasId = req.params.id
    const result = await remove(kelasId)
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
  getAllKelas,
  getKelasById,
  createKelas,
  updateKelas,
  removeKelas
}