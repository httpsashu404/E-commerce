import { Products } from "../Models/Product.js";

// Add product
export const addProduct = async (req, res) => {
    const { title, description, price, category, qty, imgSrc } = req.body
    try {
        let product = await Products.create(req.body)
        res.json({ message: 'Product added successfull', product })
    } catch (error) {
        res.json({ message: error.message })
    }
}

// get product
export const getProduct = async (req, res) => {
    try {
        let products = await Products.find().sort({ createdAt: -1 })
        res.json({message:'All Products :', products})
    } catch (error) {
        res.json({ message: error.message })
    }
}

// find product by id
export const getProductById = async (req, res) => {
    const { id } = req.params
    try {
        let products = await Products.findById(id)
        if (!id)
            return res.json({ message: "Invaide product Id" })
        res.json({ message: 'Your product is : ', products })
    } catch (error) {
        res.json({ message: error.message })
    }
}

// update product by id
export const updateProductById = async (req, res) => {
    const { id } = req.params
    try {
        // if user enter new item, its include automatic
        let products = await Products.findByIdAndUpdate(id, req.body, { new: true })
        if (!products)
            return res.json({ message: 'Product not exists' })
        res.json({ message: 'Product update successfull' })
    } catch (error) {
        res.json(error.message)
    }
}

// delete product by id
export const deleteProductById = async (req, res) => {
    const { id } = req.params
    try {
        let products = await Products.findByIdAndDelete(id)
        if(!products)
            return res.json({message:'Product not found'})
        res.json({ message: 'Product delete successfull'})
    } catch (error) {
        res.json(error.message)
    }
}