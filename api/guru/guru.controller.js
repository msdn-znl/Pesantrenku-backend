const {getAll, getById, create, update, remove} = require('./guru.service')
const response = (res, statusCode, message, data) => {
  res.status(statusCode).json({message, data})
}

const getAllGuru = async(req, res, next) => {
  try{
    const guru = await getAll()
    response(res, 200, 'success', guru)
  }catch(err){
    next(err)
  }
}
const getGuruById = async(req, res, next) =>{
  try{
    const guruId= req.params.id
    const result = await getById(guruId)
    response(res, 200, 'success', result)
  }catch(err){
    next(err)
  }
}
const createGuru = async(req, res, next) => {
  try{
    const {guruName} = req.body
    console.log(guruName)
    const guru = create({
      guruName:guruName
    })
    response(res, 200, '200', guru)
  }catch(err){
    next(err)
  }
}
const updateGuru = async(req, res, next) => {
  try{
    const guruId = req.params.id
    const {guruName} = req.body
    const result = await update(guruId, guruName)
    response(res, 200, 'success', result)
  }catch(err){
    next(err)
  }
}
const removeGuru = async(req, res, next) => {
  try{
    const guruId = req.params.id
    const result = await remove(guruId)
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
  getAllGuru,
  getGuruById,
  createGuru,
  updateGuru,
  removeGuru
}