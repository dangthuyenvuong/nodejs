import { Router } from 'express'
import CategoryController from '../controllers/CategoryController.js'

const categoryRouter = Router()

categoryRouter.get('/', CategoryController.getAll)

export default categoryRouter
