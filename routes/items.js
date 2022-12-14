const { Items } = require('../db/models/index')
const fs = require('fs')

const { password, username } = require('../config/config')
const verifyToken = require('./verifyToken')


const Add = async(req, res, next) => {
    try {
        const bodies = req.body
        const item = await Items.create({
            name: bodies.name,
            price: bodies.price,
            categories: bodies.catagories,

        })
        return res.status(201).json({
            code: 201,
            message: 'Success add item to cart'
        })
    } catch (error) {
        next(error)
    }
}

const Get = async(req, res, next) => {
    try {
        const itemShow = await Items.findAll()
        const isItemsexist = itemShow && itemShow.length > 0
        if (!isItemsexist) {
            throw {
                code: 404,
                message: "Not Found"
            }
        }
        return res.status(302).json({
            message: 'Found',
            data: itemShow
        })

    } catch (error) {
        next(error)
    }
}



module.exports = { Add, Get }