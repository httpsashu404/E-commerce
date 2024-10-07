import { Cart } from "../Models/Cart.js";

// add to cart
export const addToCart = async (req, res) => {
    const { productId, title, price, qty, imgSrc } = req.body

    const userId = res.user

    // if cart not find than create new cart
    let cart = await Cart.findOne({ userId })
    if (!cart) {
        cart = new Cart({ userId, items: [] })
    }

    // if find item than increase qty & price
    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId)
    if (itemIndex > -1) {
        cart.items[itemIndex].qty += qty
        cart.items[itemIndex].price += price * qty
    } else {
        // else add new item
        cart.items.push(req.body)
    }
    await cart.save()
    res.json({ message: 'Items added to cart', cart })

}

// get user cart
export const userCart = async (req, res) => {
    const userId = res.user
    const cart = await Cart.findOne({ userId })
    if (!cart)
        return res.json({ message: 'No any item' })
    res.json({ message: 'User cart : ', cart })
}

// remove product from cart
export const removeItemFromCart = async (req, res) => {
    const { productId } = req.params
    const userId = res.user
    const cart = await Cart.findOne({ userId })
    if (!cart)
        return res.json({ message: 'No any item' })
    cart.items = cart.items.filter((item) => item.productId.toString() !== productId)
    await cart.save()
    res.json({ message: 'Product remove form cart', cart })
}

// clear item from cart
export const clearCart = async (req, res) => {
    const userId = res.user
    const cart = await Cart.findOne({ userId })
    if (!cart) {
        cart = new Cart({ items: [] })
    } else {
        cart.items = []
    }
    await cart.save()
    res.json({ message: 'Cart cleared', cart })
}

// decrease qty from cart
export const decItemQty = async (req, res) => {
    const { productId, qty } = req.body

    const userId = res.user

    // if cart not find than create new cart
    let cart = await Cart.findOne({ userId })
    if (!cart) {
        cart = new Cart({ userId, items: [] })
    }

    // if find item than decrease qty & price
    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId)
    if (itemIndex > -1) {
        const item = cart.items[itemIndex]
        if (item.qty > qty) {
            const pricePerUnit = item.price / item.qty

            item.qty -= qty
            item.price -= pricePerUnit * qty
        } else {
            cart.items.splice(itemIndex, 1)
        }
    } else {
        return res.json({ message: 'Invalide product Id' })
    }
    await cart.save()
    res.json({ message: 'Items qty decrease', cart })

}