import express from 'express'
import { Authenticated } from '../Meddleware/adminAuth.js'
import { forgetPass, login, Profile, register } from '../Controllers/admin.js'

const router = express.Router()

// register admin
router.post('/register', register)

// login admin
router.post('/login', login)

// forget password
router.put('/forgetPass', forgetPass)

// Admin profile
router.get('/profile', Authenticated, Profile)


export default router