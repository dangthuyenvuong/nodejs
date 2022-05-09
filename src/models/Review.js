import { Sequelize } from "sequelize";
import sequelize from './base.js'

export const Reviews = sequelize.define('reviews', {
    content: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.STRING
    },
    media: {
        type: Sequelize.STRING
    },
    star: {
        type: Sequelize.NUMBER
    },
    userId: {
        type: Sequelize.NUMBER
    },
    orderItemId: {
        type: Sequelize.NUMBER
    },
}, {
    freezeTableName: true
})
