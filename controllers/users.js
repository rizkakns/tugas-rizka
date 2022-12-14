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
                phone: bodies.phone,
                address: bodies.address,
                status: bodies.status,
                role_id: isRoleExist.id
            }, {
                transactions: trx
            })
        })

        return res.status(200).json({
            code: 200,
            message: 'Success create user',
            data: {
                email: bodies.email,
                password: hasedPassword,
                name: bodies.name,
                phone: bodies.phone,
                address: bodies.address,
                status: bodies.status,
                role_id: isRoleExist.id
            }
        })
    } catch (error) {
        next(error)
    }    
}

const login = async(req, res, next) => {
    try {
        const bodies = req.body

        const isUserExist = await Users.findOne({
            where: {
                email: bodies.email,

            },
            attributes: ['password', 'id'],

        })
        if (!isUserExist) {
            throw {
                code: 400,
                message: "user not found"
            }
        }
        const passcompare = await bcrypt.compare(bodies.password, isUserExist.password)

        if (!passcompare) {
            throw {
                code: 400,
                message: "incorrect password"
            }
        }

        const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 60 * 60, id: isUserExist.id }, process.env.SECRETKEY)
        res.header('auth-token', token).json({
            token: token
        })

        return res.status(200).json({
            code: 200,
            message: "success"

        })
    } catch (error) {
        next(error)
    }
}

module.exports = { register, login }