import { Sequelize } from "sequelize";
import sequelize from './base.js'

export const Category = sequelize.define('categories', {
    name: {
        type: Sequelize.STRING
    },
    slug: {
        type: Sequelize.STRING
    }
}, {
    updatedAt: false,
    createdAt: false,
    freezeTableName: true
})
