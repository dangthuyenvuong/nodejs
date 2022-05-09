import { Sequelize } from "sequelize";
import sequelize from './base.js'

export const OrderItem = sequelize.define('order_items', {
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
    orderId: {
        type: Sequelize.NUMBER
    },
    quantity: {
        type: Sequelize.NUMBER
    }
}, {
    freezeTableName: true,
})