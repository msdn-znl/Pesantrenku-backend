const jwt = require('jsonwebtoken')
const verifyJWT = async (req, res, next) => {
    try{
        const authHeader = req.headers.authorization
        if(!authHeader) return res.status(403).json({message: 'token is missing'})
        const token = authHeader.split(' ')[1]
        
        const decoded = await jwt.verify(token, 'a9z1b8y2')
        req.user = decoded
        next()
    }catch(err){
        console.error(err)
        return res.status(401).json({message: 'invalid token'})
    }
}
module.exports=verifyJWT