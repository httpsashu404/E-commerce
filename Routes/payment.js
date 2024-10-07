import express from 'express'
import { allOrders, checkout, userOrder, Verify } from '../Controllers/payment.js'
import { Authenticated } from '../Meddleware/auth.js'

const router = express.Router()

// payment
router.post('/checkout', checkout)

// verify payment and save
router.post('/verify-payment', Verify)

// user order
router.get('/userorder', Authenticated, userOrder)


// all orders
router.get('/orders', allOrders)

export default router