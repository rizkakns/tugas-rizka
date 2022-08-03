const { register, login } = require('../controllers/users')
const validation = require('../middlewares/validation')
const registerSchema = require('../validations/registerSch')
const loginSchema = require('../validations/loginSch')
const router = require('express').Router()

router.post('/register', validation(registerSch), register)
router.post('/login', validation(loginSch), login)

module.exports = router