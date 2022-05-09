import { Sequelize } from "sequelize";
import sequelize from './base.js'

export const CartItem = sequelize.define('order_items', {
    cartId: {
        type: Sequelize.NUMBER
    },
    name: {
        type: Sequelize.STRING
    },
    regularPrice: {
        type: Sequelize.FLOAT
    },
    finalPrice: {
        type: Sequelize.FLOAT
    },
    thumbnailUrl: {
        type: Sequelize.STRING
    },
    productId: {
        type: Sequelize.NUMBER
    },
}, {
    freezeTableName: true
})

