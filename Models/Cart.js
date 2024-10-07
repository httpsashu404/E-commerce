import mongoose from "mongoose";

// cart item schema
const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        require: true
    },
    title: { type: String, require: true },
    price: { type: Number, require: true },
    qty: { type: Number, require: true },
    imgSrc: { type: String, require: true }
})

// cart schema
const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    items: [cartItemSchema],
})

export const Cart = mongoose.model('Cart', cartSchema)