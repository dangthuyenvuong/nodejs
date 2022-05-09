import { Sequelize } from "sequelize";
import sequelize from './base.js'

export const ChatGroup = sequelize.define('chatgroups', {
    name: {
        type: Sequelize.STRING
    }
}, {
    updatedAt: false,
    createdAt: false,
    freezeTableName: true
})
