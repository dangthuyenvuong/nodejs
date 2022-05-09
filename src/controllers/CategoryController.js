import { Category } from "../models/Category.model.js"

const CategoryController = {
    async getAll(req, res) {
        const response = await Category.findAll({
            include: ['products']
        })
        return res.json({ data: response })
    },
}

export default CategoryController