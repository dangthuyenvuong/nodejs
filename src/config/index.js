import { config } from 'dotenv'

config()

export const PORT = process.env.PORT
export const DB_NAME = process.env.DB_NAME
export const DB_HOST = process.env.DB_HOST
export const DB_USERNAME = process.env.DB_USERNAME
export const DB_PASSWORD = process.env.DB_PASSWORD


export const TOKEN_KEY = process.env.TOKEN_KEY
export const TOKEN_EXPRIED = process.env.TOKEN_EXPRIED
export const REFRESH_KEY = process.env.REFRESH_KEY
export const REFRESH_EXPRIED = process.env.REFRESH_EXPRIED