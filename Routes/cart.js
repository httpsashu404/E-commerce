import express from 'express'
import { addToCart, clearCart, decItemQty, removeItemFromCart, userCart } from '../Controllers/cart.js'
import { Authenticated } from '../Meddleware/auth.js'

const router = express.Router()

// add to cart
router.post('/add', Authenticated, addToCart)

// get user cart
router.get('/user', Authenticated, userCart)

// remove item from cart
router.delete('/remove/:productId', Authenticated, removeItemFromCart)

// clear cart
router.delete('/clear', Authenticated, clearCart)

// decrease qty
router.post('/--qty', Authenticated, decItemQty)

export default router