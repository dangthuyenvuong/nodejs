import jwt from 'jsonwebtoken'
import { REFRESH_EXPRIED, REFRESH_KEY, TOKEN_EXPRIED, TOKEN_KEY } from '../config/index.js'
import { FORBIDDEN } from '../config/status_code.js'
import { User } from '../models/User.model.js'

export const authen_jwt = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        if (authorization) {
            const [, token] = authorization.split(' ')
            const data = decodeAccessToken(token)
            if (data) {
                const user = await User.findByPk(data.id, {attributes: {exclude: ['password']}})
                // user.update({})
                if (user) {
                    req.user = user
                    return next()
                }
            }
        }
        throw 'Authorization is required'

    } catch (error) {
        res.status(FORBIDDEN)
            .json({
                error
            })
    }
}

export const generateAccesstoken = (data) => {
    return jwt.sign(data, TOKEN_KEY, { expiresIn: TOKEN_EXPRIED })
}

export const generateRefreshToken = (data) => {
    return jwt.sign(data, REFRESH_KEY, { expiresIn: REFRESH_EXPRIED })
}

export const decodeAccessToken = (token) => {
    return jwt.verify(token, TOKEN_KEY)
}
export const decodeRefreshToken = (token) => {
    return jwt.verify(token, REFRESH_KEY)
}