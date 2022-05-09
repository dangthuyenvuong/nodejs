import { Router } from 'express'
import UserController from '../controllers/UserController.js'
import { authen_jwt } from '../middlware/authen_jwt.js'
import { yup } from '../middlware/yup.js'

const userRouter = Router()

const validatePassword = {
    newPassword: [
        { required: true },
        { min: 6, max: 32 },
        { pattern: 'password' },
    ],
    oldPassword: [
        { required: true },
        { min: 6, max: 32 },
        { pattern: 'password' }
    ]
}


userRouter.get('/get-info', authen_jwt, UserController.getInfo)
userRouter.post('/update', authen_jwt, UserController.updateInfo)
userRouter.post('/change-password', authen_jwt, yup(validatePassword), UserController.changePassword)

export default userRouter