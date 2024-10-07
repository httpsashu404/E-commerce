import { Address } from "../Models/Address.js";

// add address
export const addAddress = async (req, res) => {
    let { fullName, address, city, state, country, pincode, phoneNumber } = req.body
    let userId = res.user
    try {
        let userAddress = await Address.create({ userId, fullName, address, city, state, country, pincode, phoneNumber })
        res.json({ message: 'Address added successfull', userAddress, success: true })
    } catch (error) {
        res.json({ message: error.message })
    }
}

// get address
export const getAddress = async (req, res) => {
    let userId = res.user
    let address = await Address.find({ userId: userId }).sort({ createdAt: -1 })
    res.json({ message: 'Address get successfull', userAddress: address[0] })
}