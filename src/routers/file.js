import { Router } from 'express'
import fs from 'fs'

const fileRouter = Router()

fileRouter.get('/', (req, res) => {
    const data = fs.readFileSync('./public/data.json')
    res.json({ data: JSON.parse(data.toString()) })
    // res.json({})
})


fileRouter.post('/', (req, res) => {
    const { body } = req
    let data = fs.readFileSync('./public/data.json')
    data = JSON.parse(data.toString())

    data = {
        ...data,
        ...body
    }

    fs.writeFileSync('./public/data.json', JSON.stringify(data, null, 2))

    res.json({ body })
})


export default fileRouter