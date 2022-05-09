import { Router } from 'express'
import ProfileController from '../controllers/ProfileController.js'
import { authen_jwt } from '../middlware/authen_jwt.js'

const profileRouter = Router()

profileRouter.get('/wishlist', authen_jwt, ProfileController.getWishlist)
profileRouter.post('/wishlist/:id', authen_jwt, ProfileController.addWishList)
profileRouter.delete('/wishlist/:id', authen_jwt, ProfileController.removeWishList)
profileRouter.get('/address/default', authen_jwt, ProfileController.getAddressDefault)
profileRouter.post('/address', authen_jwt, ProfileController.addAddress)
profileRouter.get('/address/:id?', authen_jwt, ProfileController.getAddress)
profileRouter.put('/address/:id', authen_jwt, ProfileController.editAddress)
profileRouter.delete('/address/:id', authen_jwt, ProfileController.deleteAddress)

export default profileRouter
