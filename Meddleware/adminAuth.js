import jwt from 'jsonwebtoken'
import { Admin } from '../Models/Admin.js'

export const Authenticated = async (req, res, next) => {
    const token = req.header('adminAuth')

    if (!token)
        return res.json({ message: 'Please before login' })
    const decoded = jwt.verify(token, '@#$%^*&')

    const id = decoded.adminId
    let admin = await Admin.findById(id)
    if (!admin)
        return res.json({ message: 'Admin not exist' })
    res.admin = admin
    next()
}