import express from 'express'
import { Authenticated } from '../Meddleware/auth.js'
import { login, Profile, register, users } from '../Controllers/user.js'

const router = express.Router()

// register user
router.post('/register', register)

// login user
router.post('/login', login)

// get all user
router.get('/all', users)

// get user profile
router.get('/profile', Authenticated, Profile)

export default router