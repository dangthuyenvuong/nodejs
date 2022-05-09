import { Router } from 'express'
import CartControllerV1 from '../../controllers/CartController/v1.js'
import { authen_jwt } from '../../middlware/authen_jwt.js'

const cartRouter = Router()

cartRouter.get('/', authen_jwt, CartControllerV1.getCart)
cartRouter.put('/quantity/:productId', authen_jwt, CartControllerV1.updateQuantity)
cartRouter.delete('/remove-item/:productId', authen_jwt, CartControllerV1.removeItem)

export default cartRouter