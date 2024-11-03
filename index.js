//initialize the module
require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const userRouter = require('./api/users/users.router.js')
const guruRouter = require('./api/guru/guru.router.js')
const kelasRouter = require('./api/kelas/kelas.router.js')
const santriRouter = require('./api/santri/santri.router.js')
const pelajaranRouter = require('./api/pelajaran/pelajaran.router.js')
const pelajaranGuruRouter = require('./api/pelajaran_guru/pelajaran_guru.router.js')

app.get('/', (req, res) =>{
    res.send('Hello World')
})
//middleware
app.use(express.json())
//use the router
app.use('/api/users', userRouter)
app.use('/api/guru', guruRouter)
app.use('/api/kelas', kelasRouter)
app.use('/api/santri', santriRouter)
app.use('/api/pelajaran', pelajaranRouter)
app.use('/api/pelajaran-guru', pelajaranGuruRouter)

//start the app
app.listen(port, ()=>{
    console.log(`App Listen on Port ${port}`)
})
