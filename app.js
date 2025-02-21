//initialize the module
require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
require('./middleware/passport.js')

app.get('/', (req, res) =>{
    res.send('Welcome to PesantrenkuAPI root document')
})
//Check JWT
const verifyJWT = require('./middleware/verifyJWT.js')
//Check Role
// eslint-disable-next-line no-unused-vars
const isAuthorized = require('./middleware/isAuthorized.js')
//API Router
const authRouter = require('./api/auth/auth.router.js')
const userRouter = require('./api/users/users.router.js')
const periodeRouter = require('./api/periode/periode.router.js')
const guruRouter = require('./api/guru/guru.router.js')
const santriRouter = require('./api/santri/santri.router.js')
const pelajaranRouter = require('./api/pelajaran/pelajaran.router.js')
const mapelGuruKelasRouter = require('./api/mapel_guru_kelas/mapel_guru_kelas.router.js')
const santriKelasRouter = require('./api/santri_kelas/santri_kelas.router.js')
const pertemuanRouter = require('./api/pertemuan/pertemuan.router.js')
const jadwalRouter = require('./api/jadwal/jadwal.router.js')
const kehadiranRouter = require('./api/kehadiran/kehadiran.router.js')
//middleware tingkat app
app.use(express.json())
app.use(express.urlencoded({extended: true}))
//API router
app.use('/login', authRouter)
app.use('/api/users', verifyJWT, userRouter)
app.use('/api/periode', periodeRouter)
app.use('/api/guru', guruRouter)
app.use('/api/santri', santriRouter)
app.use('/api/pelajaran', pelajaranRouter)
app.use('/api/mapel-guru-kelas', mapelGuruKelasRouter)
app.use('/api/santri-kelas', santriKelasRouter)
app.use('/api/pertemuan', pertemuanRouter)
app.use('/api/jadwal', jadwalRouter)
app.use('/api/kehadiran', kehadiranRouter)



//Error Handling
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next)=>{
    error.statusCode = error.statusCode || 500
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message
    })
})
//start the app
app.listen(port, ()=>{
    console.log(`App Listen on Port ${port}`)
})
