import { Router } from 'express'
import AuthController from '../controllers/AuthController.js'

const authRouter = Router()

authRouter.post('/login', AuthController.login)
authRouter.post('/register', AuthController.register)
authRouter.post('/refresh-token', AuthController.refreshToken)

export default authRouter



// MVC : Model - View - Controller