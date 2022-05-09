import { Sequelize } from "sequelize";
import sequelize from './base.js'

export const Product = sequelize.define('product', {
    name: {
        type: Sequelize.STRING
    },
    regularPrice: {
        type: Sequelize.FLOAT
    },
    finalPrice: {
        type: Sequelize.FLOAT
    },
    media: {
        type: Sequelize.STRING
    },
    sellCount: {
        type: Sequelize.NUMBER
    }
}, {
    updatedAt: false,
    createdAt: false,
    freezeTableName: true
})