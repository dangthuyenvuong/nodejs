import { Router } from 'express'
import OrderController from '../controllers/OrderController.js'

const orderRouter = Router()

orderRouter.post('/', OrderController.createOrder)
orderRouter.get('/', OrderController.getAll)
orderRouter.post('/:id', OrderController.getDetail)

export default orderRouter