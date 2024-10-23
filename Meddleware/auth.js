import jwt from 'jsonwebtoken'
import { User } from '../Models/User.js'

export const Authenticated = async (req, res, next) => {
    const token = req.header('auth')

    if (!token)
        return res.json({ message: 'Please before login' })
    const decoded = jwt.verify(token, '@#$%^*&')

    const id = decoded.userId
    let user = await User.findById(id)
    if (!user)
        return res.json({ message: 'User not exist' })
    res.user = user
    next()
}