import express from 'express'
import { addProduct, deleteProductById, getProduct, getProductById, updateProductById } from '../Controllers/product.js'

const router = express.Router()

// add product
router.post('/add', addProduct)

// all product
router.get('/all',getProduct)

// single product
router.get('/:id',getProductById)

// edit product
router.put('/:id',updateProductById)

// delete product
router.delete('/:id',deleteProductById)

export default router