import { Sequelize } from "sequelize";
import sequelize from './base.js'

export const Wishlist = sequelize.define('wishlists', {
    productId: {
        type: Sequelize.NUMBER,
        primaryKey: true,
    },
    userId: {
        type: Sequelize.NUMBER,
        primaryKey: true,
    }
}, {
    freezeTableName: true,
})
