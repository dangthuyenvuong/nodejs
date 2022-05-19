import { Sequelize } from "sequelize";
import sequelize from './base.js'

export const ChatGroup = sequelize.define('chat_group', {
    name: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING
    },
    thumbnailUrl: {
        type: Sequelize.STRING
    }
}, {
    updatedAt: false,
    createdAt: false,
    freezeTableName: true
})
