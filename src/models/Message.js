import { Sequelize } from "sequelize";
import sequelize from './base.js'

export const Message = sequelize.define('messages', {
    name: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true
})
