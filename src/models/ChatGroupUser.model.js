import { Sequelize } from "sequelize";
import sequelize from './base.js'

export const ChatGroupUser = sequelize.define('chat_group_user', {
    name: {
        type: Sequelize.STRING
    }
}, {
    updatedAt: false,
    createdAt: false,
    freezeTableName: true
})
