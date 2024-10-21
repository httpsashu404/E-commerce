import express from 'express'
// import { Authenticated } from '../Meddleware/auth.js'
import { forgetPass, login, register } from '../Controllers/admin.js'

const router = express.Router()

// register admin
router.post('/register', register)

// login admin
router.post('/login', login)

// forget password
router.put('/forgetPass', forgetPass)


export default router