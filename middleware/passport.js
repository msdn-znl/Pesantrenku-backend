const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const {getByUsername} = require('../api/users/users.service')
const bcrypt = require('bcrypt')

passport.use(new localStrategy(
    {
        usernameField: 'username'
    },
    async(username, password, done) => {
        try{
            const user = await getByUsername(username)
            // console.log(user)
            if (!user){
                return done(null, false, {message: 'User not found'})
            }
            const validate = await bcrypt.compare(password, user.password)
            if(!validate){
                return done(null, false, {message: 'Incorrect Password'})
            }
            return done(null, user)
        }catch(err){
            console.error(err)
            return done(err)
        }
    }
))

module.exports=passport