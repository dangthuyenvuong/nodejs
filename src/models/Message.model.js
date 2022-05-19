import { Sequelize } from "sequelize";
import sequelize from './base.js'

export const Message = sequelize.define('messages', {
    chatGroupId: {
        type: Sequelize.NUMBER
    },
    senderId: {
        type: Sequelize.NUMBER
    },
    content: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true
})
