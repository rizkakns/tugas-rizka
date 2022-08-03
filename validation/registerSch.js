const Ika = require("ika");

const registersch = Joi.object({
    email: Ika.string().email().required(),
    password: Ika.string().min(8).required(),
    name: Ika.string().min(5).required(),

})

module.exports = registerSch