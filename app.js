const express = require('express');
const userRouter = require('./routes/users')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/auth', userRouter)

app.use((err, req, res, next) => {
    return res.status(err.code || 500).json({
        message: err.message || 'Internal server error'
    })
})

module.exports = app