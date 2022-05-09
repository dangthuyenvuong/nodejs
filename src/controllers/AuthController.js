import md5 from "md5"
import { decodeRefreshToken, generateAccesstoken, generateRefreshToken } from "../middlware/authen_jwt.js"
import { User } from "../models/User.model.js"
import { BAD_REQUEST } from '../config/status_code.js'
import validate from "../utils/validate.js"

const AuthController = {
    async login(req, res) {
        try {
            let { username, password } = req.body
            if (!username || !password) {
                return res.json({ error: 'Xin vui lòng điền đầy đủ thông tin' })
            }
            password = md5(password)
            const user = await User.findOne({ where: { username, password }, attributes: { exclude: ['password'] } })
            if (user) {
                const tokenData = { id: user.id }
                const accessToken = generateAccesstoken(tokenData)
                const refreshToken = generateRefreshToken(tokenData)
                return res.json({ data: { accessToken, refreshToken } })
            }

            throw 'Tên đăng nhập hoặc mật khẩu không đúng'
        } catch (error) {
            res.json({ error })
        }
    },
    async register(req, res) {
        try {
            let { username, password, fullName } = req.body


            const error = validate(req.body, {
                username: [
                    { required: true },
                    { pattern: 'email' }
                ],
                password: [
                    { required: true },
                    { min: 6, max: 32 },
                    { pattern: 'password' }
                ],
                fullName: [
                    { required: true }
                ]
            })

            if (Object.keys(error).length === 0) {
                password = md5(password)
                const user = await User.create({
                    username,
                    password,
                    fullName
                })

                if (user) {
                    const tokenData = { id: user.id }
                    const accessToken = generateAccesstoken(tokenData)
                    const refreshToken = generateRefreshToken(tokenData)
                    return res.json({ data: { accessToken, refreshToken } })
                }
            }

            return res.status(BAD_REQUEST).json({ errors: error, error_message: 'Validate failed' })

        } catch (error) {
            const check = error.errors.find(e => e.path === 'username' && e.validatorKey === 'not_unique')
            if (check) {
                return res.json({ error: 'Username đã tồn tại' })
            }
            return res.json({ error })
        }

    },
    async refreshToken(req, res) {
        try {
            let { refreshToken } = req.body
            const data = decodeRefreshToken(refreshToken)
            const accessToken = generateAccesstoken({ id: data.id })
            return res.json({ data: { accessToken } })
        } catch (error) {
            res.status(BAD_REQUEST)
                .json({ error })
        }
    }
}

export default AuthController

