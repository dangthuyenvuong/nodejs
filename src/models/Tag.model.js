import { Sequelize } from "sequelize";
import sequelize from './base.js'

export const Tag = sequelize.define('tags', {
    name: {
        type: Sequelize.STRING
    }
}, {
    updatedAt: false,
    createdAt: false,
    freezeTableName: true
})


// 1 - 1
// 1 - M
// M - M