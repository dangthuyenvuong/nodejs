import { Router } from 'express'
import ProductController from '../controllers/ProductController.js'

const productRouter = Router()

productRouter.get('/categories', ProductController.getAllCategories)

productRouter.get('/', ProductController.getAllProduct)
productRouter.get('/count', ProductController.count)

productRouter.get('/:id', ProductController.getProductDetail)




export default productRouter