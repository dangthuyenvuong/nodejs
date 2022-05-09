import express from 'express'
import cors from 'cors'
import userRouter from './src/routers/user.js'
import productRouter from './src/routers/product.js'
import authRouter from './src/routers/auth.js'
import cartRouterV1 from './src/routers/cart/v1.js'
import cartRouterV2 from './src/routers/cart/v2.js'
import profileRouter from './src/routers/profile.js'
import orderRouter from './src/routers/order.js'
import fileRouter from './src/routers/file.js'
import { PORT } from './src/config/index.js'
import './src/models/relation.js'
import categoryRouter from './src/routers/category.js'
import http from 'http'
import socket from './socket.js'

const app = express()
const server = http.createServer(app)
socket(server)

app.use(express.static('public'))
app.use(express.json())
app.use(cors())


app.use('/user', userRouter)
app.use('/product', productRouter)
app.use('/ecommerce/v1/cart', cartRouterV1)
app.use('/ecommerce/v2/cart', cartRouterV2)
app.use('/ecommerce/v1/profile', profileRouter)
app.use('/ecommerce/v1/order', orderRouter)
app.use('/ecommerce/v1/category', categoryRouter)
app.use('/file', fileRouter)

app.use(authRouter)


app.use((err, req, res, next) => {
    console.error(err.message); // Log error message in our server's console
    if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
    res.status(err.statusCode).json({ error_message: err.message }); // All HTTP requests must have a response, so let's send back an error with its status code and message
})
server.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`)
})
