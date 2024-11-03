const {getAll, getById, create, update, remove} = require('./pelajaran.service')
const response = (res, statusCode, message, data) => {
  res.status(statusCode).json({message, data})
}

const getAllPelajaran = async(req, res, next) => {
  try{
    const pelajaran = await getAll()
    response(res, 200, 'success', pelajaran)
  }catch(err){
    next(err)
  }
}
const getPelajaranById = async(req, res, next) =>{
  try{
    const pelajaranId= req.params.id
    const pelajaran = await getById(pelajaranId)
    response(res, 200, 'success', pelajaran)
  }catch(err){
    next(err)
  }
}
const createPelajaran = async(req, res, next) => {
  try{
    const pelajaranData = req.body
    if(Array.isArray(pelajaranData)){
      const createdPelajarans = await Promise.all(
        pelajaranData.map(async (pelajaran) => {
          const {pelajaranName, kelasId} = pelajaran
          const createdPelajaran = create(pelajaranName, kelasId)
          return createdPelajaran
        })
      )
      response(res, 200, 'success', createdPelajarans)
    }else{
      const {pelajaranName, kelasId} = req.body
      const createdPelajaran = create(pelajaranName, kelasId)
      response(res, 200, 'success', createdPelajaran)
    }
  }catch(err){
    next(err)
  }
}
const updatePelajaran = async(req, res, next) => {
  try{
    const pelajaranId = req.params.id
    const {pelajaranName} = req.body
    const pelajaran = await update(pelajaranId, pelajaranName)
    response(res, 200, 'success', pelajaran)
  }catch(err){
    next(err)
  }
}
const removePelajaran = async(req, res, next) => {
  try{
    const pelajaranId = req.params.id
    const result = await remove(pelajaranId)
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
  getAllPelajaran,
  getPelajaranById,
  createPelajaran,
  updatePelajaran,
  removePelajaran
}