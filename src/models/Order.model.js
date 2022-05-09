import { Sequelize } from "sequelize";
import sequelize from './base.js'

export const Order = sequelize.define('orders', {
    userId: {
        type: Sequelize.NUMBER
    },
    totalPrice: {
        type: Sequelize.FLOAT
    },
    tax: {
        type: Sequelize.FLOAT
    },
    shipping: {
        type: Sequelize.FLOAT
    },
    type: {
        type: Sequelize.ENUM('order', 'cart')
    },
}, {
    freezeTableName: true,
})


export const getUserCart = async (user) => {
    let cart = await Order.findOne({
        userId: user.id,
        type: 'cart',
        include: ['products']
    })
    if (!cart) {
        cart = await Order.create({
            userId: user.id,
            type: 'cart'
        })
    }
    return cart
}