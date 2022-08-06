const { verify } = require('jsonwebtoken')
const { Order, Items, Transactions } = require('../db/models/index')
const decode = require('jwt-decode')
const jwt = require('jsonwebtoken')
const verifyToken = require('./verifyToken')
const { default: jwtDecode } = require('jwt-decode')
const { DATE } = require('sequelize/types')


const Order = async(req, res, next) => {
    try {
        const bodies = req.body
        const token = req.header('auth-token')
        const decode = jwtDecode(token)

        const isItemsExist = await Items.findOne({
            where: {
                id: bodies.ItemId

            },
            attributes: ['name', 'price','categories', 'id']
        })

        if (!isItemsExist) {
            throw {
                code: 404,
                message: "Not Found"
            }
        }

        const orderExist = await Order.findOne({
            where: {
                users_id: decode.id,
                items_id: isItemsExist.id,
                status: 'Unpaid'
            },

        })

        if (!orderExist) {
            const order = await Order.create({
                invoice: Math.floor(Math.random() * 1000000000),
                name: isItemsExist.name,
                users_id: decode.id,
                items_id: isItemsExist.id,
                total_items: bodies.total_items,
                total_amount: isItemsExist.price * bodies.total_items,
                status: "Unpaid"
            })
            return res.status(201).json({
                code: 201,
                message: 'Success add to cart',
                data: {
                    invoice: Order.invoice,
                    name: Order.name,
                    users_id: Order.users_id,
                    items_id: Order.items_id,
                    qty: Order.total_items,
                    price: Order.total_amount,
                    status: 'Unpaid'
                }
            })
        }


        await Order.update({
            qty: orderExist.total_items + (bodies.total_items),
            price: orderExist.total_amount + (isItemsExist.total_amount * bodies.total_items)
        }, {
            where: {
                items_id: orderExist.items_id,
            }
        })
        return res.status(201).json({
            code: 201,
            message: "Success add to cart",
            data: {
                invoice: orderExist.invoice,
                name: orderExist.name,
                users_id: orderExist.users_id,
                items_id: orderExist.items_id,
                qty: orderExist.total_items,
                price: orderExist.total_amount,
                status: 'Unpaid'
            }
        })
    } catch (error) {
        next(error)
    }
}



const Payment = async(req, res, next) => {
    try {
        const bodies = req.body
        const token = req.header('auth-token')
        const decode = jwtDecode(token)

        const orderExist = await Order.findAll({
            where: {
                users_id: decode.id,
                status: 'Unpaid'
            },
        })
        if (orderExist.length < 1) {
            throw {
                code: 400,
                message: "Not found"
            }
        }
        const updatedata = await Order.update({
            status: 'Unpaid'
        }, {
            where: {
                users_id: decode.id,
                items_id: bodies.item_Id,
            }
        })

        return res.status(302).json({
            code: 302,
            message: orderExist,

        })
    } catch (error) {
        next(error)
    }
}


const getOrder = async(req, res, next) => {
    try {
        const bodies = req.body
        const token = req.header('auth-token')
        const decode = jwtDecode(token)
        const orderExist = await Order.findAll({
            where: {
                users_id: decode.id,
            },
        })
        if (orderExist.length < 1) {
            throw {
                code: 400,
                message: "Empty cart"
            }
        }
        return res.status(200).json({
            code: 200,
            message: orderExist,

        })
    } catch (error) {
        next(error)
    }
}


const deleteOrder = async(req, res, next) => {
    try {
        const bodies = req.body
        const token = req.header('auth-token')
        const decode = jwtDecode(token)
        const orderExist = await Order.findAll({
            where: {
                users_id: decode.id,

            },
        })

        if (orderExist.length < 1) {
            throw {
                code: 400,
                message: "Empty"
            }
        }


        await Order.destroy({
            where: {
                users_id: decode.id,
                status: 'Paid'
            }
        })

        return res.status(200).json({
            code: 200,
            message: orderExist


        })

    } catch (error) {
        next(error)
    }
}


module.exports = { Order, Payment, getOrder, deleteOrder }