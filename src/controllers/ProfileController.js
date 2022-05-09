import { Wishlist } from "../models/Wishlist.model.js"
import { BAD_REQUEST } from "../config/status_code.js"
import { Product } from "../models/Product.model.js"
import { UserAddress } from "../models/UserAddress.model.js"

const ProfileController = {
    async getWishlist(req, res) {
        const result = await Wishlist.findAll({
            where: { userId: req.user.id },
            include: 'product'
        })
        res.json({ data: result })
    },
    async addWishList(req, res, next) {
        let { id } = req.params
        const product = await Product.findByPk(id)
        if (!product) {
            return next(Error('product not exists!'))
        }

        const wishlist = await Wishlist.findOne({
            where: {
                userId: req.user.id,
                productId: id
            }
        })
        if (wishlist) {
            return next(Error('Product have exists in whishlist!'))
        }
        const result = await Wishlist.create({
            userId: req.user.id,
            productId: id,
        })
        return res.json({
            data: true
        })
    },
    async removeWishList(req, res) {
        let { id } = req.params
        const result = await Wishlist.destroy({
            where: { userId: req.user.id, productId: id }
        })
        res.json({ data: { deletedCount: result } })
    },
    async getAddress(req, res) {
        let { id } = req.params
        let address
        if (id) {
            address = await UserAddress.findOne({
                where: { userId: req.user.id, id }
            })
        } else {
            address = await UserAddress.findAll({
                where: { userId: req.user.id }
            })
        }


        res.json({ data: address })
    },
    async getAddressDefault(req, res) {
        const address = await UserAddress.findOne({
            where: { userId: req.user.id }
        })
        res.json({ data: address })
    },
    async addAddress(req, res) {
        const address = await UserAddress.create({
            ...req.body,
            userId: req.user.id
        })
        return res.json(address)
    },
    async editAddress(req, res) {
        let { id } = req.params
        let address = await UserAddress.findOne({
            where: {
                id,
                userId: req.user.id
            }
        })
        if (!address) {
            return next(Error('Address doese not exists!'))
        }

        address = await address.update(req.body)
        res.json({ data: address })
    },
    async deleteAddress(req, res) {
        let { id } = req.params
        const result = await UserAddress.destroy({ where: { id, userId: req.user.id } })
        res.json({ data: { deletedCount: result } })
    }
}

export default ProfileController