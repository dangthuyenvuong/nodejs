import { Sequelize } from "sequelize";
import sequelize from './base.js'

export const User = sequelize.define('users', {
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    fullName: {
        type: Sequelize.STRING
    },
    birthday: {
        type: Sequelize.DATE
    },
    avatar: {
        type: Sequelize.STRING
    }
}, {
    updatedAt: false,
    createdAt: false
})
