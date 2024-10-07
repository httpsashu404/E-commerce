import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'express'
import cors from 'cors'
import userRouter from './Routes/user.js'
import productRouter from './Routes/product.js'
import cartRouter from './Routes/cart.js'
import addressRouter from './Routes/address.js'
import paymentRouter from './Routes/payment.js'

const app = express()
const PORT = 5000
app.use(bodyParser.json())
app.use(cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

// connect mongoose
try {
    mongoose.connect('mongodb+srv://ashutoshkumarssm352:q3WNimInrNkgnaTE@cluster0.fystu.mongodb.net/MERN_e-commerce')
    console.log('Database connected')
} catch (error) {
    console.log('Connection failed')
}

// home route
app.get('/', (req, res) => {
    res.json({ message: 'Hello Developers' })
})

// user Router
app.use('/api/user', userRouter)

// product Router
app.use('/api/product', productRouter)

// cart Router
app.use('/api/cart', cartRouter)

// address Router
app.use('/api/address', addressRouter)

// payment Router
app.use('/api/payment',paymentRouter)


// server listen port
app.listen(PORT, (req, res) => {
    console.log(`Server has started on : ${PORT}`)
})