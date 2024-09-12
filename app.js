//initialize the module
require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

//start the app
app.listen(port, ()=>{
    console.log(`App Listen on Port ${port}`)
})
