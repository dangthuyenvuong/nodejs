import md5 from 'md5'
import { BAD_REQUEST } from '../config/status_code.js'
import { User } from '../models/User.model.js'
import validate from '../utils/validate.js'

const UserController = {
    getInfo(req, res) {
        res.json({ success: req.user })
    },
    async updateInfo(req, res) {
        // let { fullName, birthday, avatar } = req.body
        // const response = await User.update(req.body, { where: { id: req.user.id } })
        const user = await req.user.update({ ...req.body, username: undefined })
        res.json({ data: user })

    },
    async changePassword(req, res) {
        let { newPassword, oldPassword } = req.body
        if (newPassword === oldPassword) {
            return res.status(BAD_REQUEST).json({ error_message: 'Old password and new password cannot be same!' })
        }
        const user = await User.findOne({
            where: { id: req.user.id, password: md5(oldPassword) }
        })
        if (user) {
            user.update({ password: md5(newPassword) })
            return res.json({ message: 'Change password success' })
        }
        return res.status(BAD_REQUEST).json({ error_message: 'The old password you have entered is incorrect' })
    },



    async demo(req, res) {

        const response = await User.findAll({
            where: {
                username: 'dangthuyenvuong',
            },
            include: ['cart']
        })
        res.json(response)
    },
}

export default UserController