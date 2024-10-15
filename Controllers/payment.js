import { Payment } from '../Models/Payment.js'
import Razorpay from 'razorpay'
import dotenv from 'dotenv'

dotenv.config()
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

// const rzp = new Razorpay(options);
// rzp.open();

// checkout
export const checkout = async (req, res) => {
    const { amount, certItem, userShiping, userId } = req.body
    var options = {
        amount: amount * 100,
        currency: 'INR',
        receipt: `receipt_${(Date.now())}`,
    }
    const order = await razorpay.orders.create(options)
    res.json({
        orderId: order.id,
        amount: amount,
        certItem,
        userShiping,
        userId,
        payStatus: 'created'
    })
}

// order confirm and save
export const Verify = async (req, res) => {
    const { orderId, paymentId, signature, amount, orderItems, userId, userShiping } = req.body
    let orderConfirm = await Payment.create({ orderId, paymentId, signature, amount, orderItems, userId, userShiping, payStatus: 'Paid' })
    res.json({ message: 'Payment successfull : ', success: true, orderConfirm })
}

// user order
export const userOrder = async (req, res) => {
    let userId = res.user._id.toString()
    let orders = await Payment.find(userId).sort({ orderDate: -1 })
    res.json(orders)
}

// all order
export const allOrders = async (req, res) => {
    let orders = await Payment.find().sort({ orderDate: -1 })
    res.json(orders)
}