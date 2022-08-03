const { Order, Payment, getOrder, deleteOrder } = require('../controllers/orders')
const verifyToken = require('../controllers/verifyToken')

const router = require('express').Router()

router.get('/items', verifyToken, getItems)
router.delete('/delete', verifyToken, deleteOrder)

module.exports = router