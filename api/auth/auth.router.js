const router = require('express').Router()
const passport = require('../../middleware/passport')
const jwt = require('jsonwebtoken')

router.post('/', async(req, res, next)=> {
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
            const token = jwt.sign({user: body}, 'a9z1b8y2', {expiresIn: '15m' /** 15 menit */})
            
            //mengembalikan  token jwt
            return res.status(200).json({token})

            //mengembalikan token jwt ke http only cookie
            // return res.cookie('token', token, {
            //   httpOnly: true,
            //   maxAge: 3600000 //1 Jam
            // })
          }
        )
      } catch (err){
        return next(err)
      }
    })(req, res, next)
})

module.exports = router