import { Router } from 'express'
import CartControllerV2 from '../../controllers/CartController/v2.js'

const cartRouter = Router()

cartRouter.get('/', CartControllerV2.getCart)
cartRouter.put('/quantity/:id', CartControllerV2.updateQuantity)
cartRouter.delete('/remove-item/:id', CartControllerV2.removeItem)

export default cartRouter