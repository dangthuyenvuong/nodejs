import { Product } from "../models/Product.model.js"
import { Category } from "../models/Category.model.js"
import { BAD_REQUEST } from "../config/status_code.js"
import { standardProductWhere, standardSort } from "../utils/standard.js"




const ProductController = {
    async getAllProduct(req, res) {
        let { sort, name, fields, limit = 15, offset = 0, minPrice, maxPrice } = req.query

        if (typeof limit === 'string') limit = parseInt(limit)
        if (typeof offset === 'string') offset = parseInt(offset)

        const where = standardProductWhere(name, minPrice, maxPrice)
        sort = standardSort(sort)

        let attributes

        if (fields) {
            attributes = fields.split(',')
        }
        try {
            const products = await Product.findAll({
                order: sort,
                where,
                attributes,
                limit,
                offset
            })
            res.json({ data: products })
        } catch (error) {
            res.status(BAD_REQUEST).json(error)
        }
    },
    async getAllCategories(req, res) {
        try {
            const cates = await Category.findAll()
            res.json({ data: cates })
        } catch (error) {
            res.status(BAD_REQUEST).json(error)
        }
    },
    async getProductDetail(req, res) {
        const { id } = req.params
        const product = await Product.findByPk(id)
        res.json({ data: product })
    },
    async count(req, res) {
        let { name, minPrice, maxPrice } = req.query
        const where = standardProductWhere(name, minPrice, maxPrice)
        const count = await Product.count({ where })
        res.json({ count })
    }
}
export default ProductController