import { Sequelize } from "sequelize";
import sequelize from './base.js'

export const UserAddress = sequelize.define('user_address', {
    phone: {
        type: Sequelize.STRING,
    },
    name: {
        type: Sequelize.STRING,
    },
    city: {
        type: Sequelize.STRING,
    },
    isDefault: {
        type: Sequelize.BOOLEAN,
    },
    district: {
        type: Sequelize.STRING,
    },
    userId: {
        type: Sequelize.NUMBER,
    },
    address: {
        type: Sequelize.STRING,
    },
    province: {
        type: Sequelize.STRING,
    }
}, {
    freezeTableName: true,
})
