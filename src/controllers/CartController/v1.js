import { BAD_REQUEST } from '../../config/status_code.js'
import { getUserCart, Order } from '../../models/Order.model.js'
import { Product } from '../../models/Product.model.js'
import { User } from '../../models/User.model.js'
import { OrderItem } from '../../models/OrderItem.model.js'
const CartControllerV1 = {
    async getCart(req, res) {
        try {
            let cart = await getUserCart(req.user)

            return res.json({ data: cart })
        } catch (error) {
            console.error(error)
        }
    },
    async updateQuantity(req, res) {
        try {
            let { quantity } = req.body
            let { productId } = req.params
            const product = await Product.findByPk(productId)
            if (product) {
                let cart = await getUserCart(req.user)
                const media = JSON.parse(product.media)


                let orderItem = await OrderItem.findOne({
                    where: {
                        orderId: cart.id,
                        productId
                    }
                })

                const data = {
                    productId,
                    orderId: cart.id,
                    name: product.name,
                    regularPrice: product.regularPrice,
                    finalPrice: product.finalPrice,
                    thumbnailUrl: media?.[0],
                    quantity
                }

                if (orderItem) {
                    orderItem = await OrderItem.update(data, { where: { id: orderItem.id } })
                    return res.json({
                        data: { updatedCount: orderItem[0] }
                    })
                } else {
                    orderItem = await OrderItem.create(data)
                    return res.json({
                        data: { createdCount: 1 }
                    })
                }
            }

            return res.status(BAD_REQUEST).json({ error_message: 'Product not exists!' })
        } catch (errors) {
            return res.status(BAD_REQUEST).json({ errors })
        }
    },
    async removeItem(req, res) {
        let { productId } = req.params
        let cart = await getUserCart(req.user)
        const result = await OrderItem.destroy({ where: { orderId: cart.id, productId } })

        res.json({ data: { deletedCount: result } })
    },
}
export default CartControllerV1