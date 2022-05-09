import { Op } from "sequelize"

export const standardSort = (sort) => {
    if (sort === 'top_seller') {
        sort = [['sellCount', 'desc']]
    } else if (sort) {
        sort = sort.split('.')
        if (sort.length === 2) {
            sort = [[sort[0], sort[1]]]
        }
    }
    if (!Array.isArray(sort)) {
        sort = undefined
    }
    return sort
}


export const standardProductWhere = (name, minPrice, maxPrice) => {
    const where = {}

    if (name) {
        where.name = {
            [Op.like]: `%${name}%`
        }
    }

    if (minPrice) {
        where.finalPrice = {
            [Op.gte]: minPrice,
        }
    }

    if (maxPrice) {
        if (!where.finalPrice) {
            where.finalPrice = {}
        }

        where.finalPrice[Op.lte] = maxPrice
    }

    return where
}