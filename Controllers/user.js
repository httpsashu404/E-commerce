import { User } from "../Models/User.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

// Register user
export const register = async (req, res) => {
    const { name, email, phone, password } = req.body
    try {
        let user = await User.find({ email } || { phone })
        if (user) return res.json({ message: 'User Already exist', success: true })
        const hashPass = await bcrypt.hash(password, 10)
        user = await User.create({ name, email, phone, password: hashPass })
        res.json({ message: "User resgister successfully", user, success: true })
    } catch (error) {
        res.json({ message: error.message })
    }
}

// Login user
export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user)
            return res.json({ message: "User doesn't exist", success: false })
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword)
            return res.json({ message: "Wrong password", success: false })

        const token = jwt.sign({ userId: user._id }, '@#$%^*&', {
            expiresIn: '365d'
        })

        res.json({ message: `Welcome ${user.name}`, token, success: true })
    } catch (error) {
        res.json({ message: error.message })
    }
}

// forget user password
export const forgetPass = async (req, res) => {
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user)
            return res.json({ message: "User doesn't exist", success: false })
        const hashPass = await bcrypt.hash(password, 10)
        user = await User.findOneAndUpdate({ email: email }, { password: hashPass })
        res.json({ message: "Password reset successfully", user, success: true })

    } catch (error) {
        res.json({ message: error.message })
    }
}

// get all users
export const users = async (req, res) => {
    try {
        let users = await User.find().sort({ createdAt: -1 })
        res.json({ users })
    } catch (error) {
        res.json(error.message)
    }
}

// get profile
export const Profile = async (req, res) => {
    let user = res.user
    res.json({ user })
}