const { Users, Roles, Cards, Points, sequelize } = require('../db/models')
const bcrypt = require('bcrypt')
const { add } = require('date-fns')

const register = async (req, res, next) => {
    try {
        const bodies = req.body

        const [isRoleExist, isUserExist] = await Promise.all([
            Roles.findOne({
                where: {
                    id: bodies.role_id
                },
                attributes: ['id', 'name']
            }),
            Users.findOne({
                where: {
                    email: bodies.email
                },
                attributes: ['id']
            })
        ])

        // cek apakah role_id nya ada atau tidak
        if (!isRoleExist) {
            throw {
                code: 404,
                message: 'Role not found'
            }
        }

        // cek apakah ada user yang memiliki email yang sudah di register
        // if user exist, send error message
        if (isUserExist) {
            throw {
                code: 400,
                message: 'Email already exist'
            }
        }

        // hash pw karna secret
        const hasedPassword = bcrypt.hashSync(bodies.password, 12)
        let user = {}

        await sequelize.transaction(async trx => {
            // insert ke db
            user = await Users.create({
                email: bodies.email,
                password: hasedPassword,
                name: bodies.name,
                role_id: isRoleExist.id
            }, {
                transaction: trx
            })
        })

        return res.status(200).json({
            code: 200,
            message: 'Success create user',
            data: {
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        next(error)
    }    
}

module.exports = {
    register
}