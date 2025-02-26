const router = require('express').Router()
const passport = require('../../middleware/passport')
const jwt = require('jsonwebtoken')
const config = require('../../config/index').jwt

//login
router.post('/login', async(req, res, next)=> {
    // eslint-disable-next-line no-unused-vars
    passport.authenticate("local", { session: false }, async (err, user, info) => {
      try{
        if(!user) {
          return res.status(404).json({
            status: 'fail',
            message: 'User Not Found'
          })
        } else if (err){
          const err = new Error('An Error occurred.')
          return next(err)
        }
        req.login(
          user, {session: false},
          async(error) => {
            if(error) {
              // console.error(error)
              return next(error);
            }
            
            const body = {id: user.id, username: user.username, role: user.roles}
            const accessToken = jwt.sign({user: body}, config.access, {expiresIn: '15m' /** 15 menit */})
            const refreshToken = jwt.sign({user: body}, config.refresh, {expiresIn: '1d' /** 1 hari */})
            //mengembalikan  token jwt
            // return res.status(200).json({token})

            //mengembalikan token jwt ke http only cookie
            res.cookie('accessToken', accessToken, {
              httpOnly: true,
              secure: false,
              sameSite: true,
              maxAge: 900000 //15 Menit
            })
            res.cookie('refreshToken', refreshToken, {
              httpOnly: true,
              secure: false,
              sameSite: true,
              maxAge: 86400000 //1 Hari
            })
            return res.status(200).json({
              status: 'success',
              message: 'Login Success',
            })
          }
      )
      } catch (err){
        return next(err)
      }
    })(req, res, next)
})

//logout
router.post('/logout', async (req, res, next)=> {
  try {
    res.cookie('accessToken', '', {httpOnly:true, secure: false, sameSite: 'Strict', expires: new Date(0)})
    res.cookie('refreshToken', '', {httpOnly:true, secure: false, sameSite: 'Strict', expires: new Date(0)})
    return res.status(200).json({
      status: 'success',
      message: 'Successfully loging out'
    })
  } catch (error) {
    next(error)
  }
})

//refresh for access token
router.post('/refresh', async(req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
      return res.status(401).json({status: 'failed', message: 'no token provided, please login'})
    }
    //cek apakah refresh token valid
    jwt.verify(refreshToken, config.refresh, (err, user) => {
      if (err) return res.status(403).json({status: 'failed', message: 'invalid refresh token'})
      //generate access token baru
      const body = {id: user.id, username: user.username, role: user.roles}
      const accessToken = jwt.sign(body, config.access, {expiresIn: '15m'})
      //mengirim access token ke cookie client
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: true,
        maxAge: 900000 //15 menit
      })
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router