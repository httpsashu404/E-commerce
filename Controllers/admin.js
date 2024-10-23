import { Admin } from '../Models/Admin.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

// Register admin
export const register = async (req, res) => {
    const name = 'Ashu Singh'
    const email = 'ashutosh352@gmail.com'
    const phone = 8986237893
    const password = 'Ashu5440'
    const query = {
        $or: [
            { email: email },
            { phone: phone }
        ]
    }
    try {
        let admin = await Admin.findOne(query)
        if (admin) return res.json({ message: 'Admin Already exist', success: false })
        const hashPass = await bcrypt.hash(password, 10)
        admin = await Admin.create({ name, email, phone, password: hashPass })
        res.json({ message: "Admin resgister successfully", admin, success: true })
    } catch (error) {
        res.json({ message: error.message })
    }
}

// Login admin
export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        let admin = await Admin.findOne({ email })
        if (!admin)
            return res.json({ message: "Admin doesn't exist", success: false })
        const validPassword = await bcrypt.compare(password, admin.password)
        if (!validPassword)
            return res.json({ message: "Wrong password", success: false })

        const token = jwt.sign({ adminId: admin._id }, '@#$%^*&', {
            expiresIn: '365d'
        })

        res.json({ message: `Welcome ${admin.name}`, token, success: true })
    } catch (error) {
        res.json({ message: error.message })
    }
}

// forget admin password
export const forgetPass = async (req, res) => {
    const { email, password } = req.body
    try {
        let admin = await Admin.findOne({ email })
        if (!admin)
            return res.json({ message: "User doesn't exist", success: false })
        const hashPass = await bcrypt.hash(password, 10)
        admin = await Admin.findOneAndUpdate({ email: email }, { password: hashPass })
        res.json({ message: "Password reset successfully", admin, success: true })

    } catch (error) {
        res.json({ message: error.message })
    }
}

// get profile
export const Profile = async (req, res) => {
    let admin = res.admin
    res.json({ admin })
}

