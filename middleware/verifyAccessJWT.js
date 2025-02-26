const jwt = require('jsonwebtoken')
const path = require('path')
require('dotenv').config({path: path.join(__dirname, '../.env') })

const verifyAccessJWT = async (req, res, next) => {
    try{
        //get the token from auth headers
        // const authHeader = req.headers.authorization
        // if(!authHeader) return res.status(403).json({message: 'token is missing'})
        // const token = authHeader.split(' ')[1]
        
        //get the token from cookies
        const accessToken = req.cookies.accessToken
        if (!accessToken) return res.status(403).json({status: 'failed', message: 'token is missing'})

        const decoded = await jwt.verify(accessToken, process.env.ACCESS_SECRET)
        req.user = decoded
        next()
    }catch(err){
        console.error(err)
        return res.status(401).json({message: 'invalid token'})
    }
}
module.exports=verifyAccessJWT