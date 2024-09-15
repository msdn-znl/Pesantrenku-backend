//initialize the module
require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const userRouter = require('./api/users/users.router.js')

app.get('/', (req, res) =>{
    res.send('Hello World')
})
//middleware
app.use(express.json())
//use the router
app.use('/api/users', userRouter)

//start the app
app.listen(port, ()=>{
    console.log(`App Listen on Port ${port}`)
})
