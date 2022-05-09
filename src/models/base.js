import { Sequelize } from 'sequelize'
import { DB_NAME, DB_HOST, DB_PASSWORD, DB_USERNAME } from '../config/index.js'

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql'
})


try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
} catch (error) {
    console.error('Unable to connect to the database: ', error)
}

export default sequelize