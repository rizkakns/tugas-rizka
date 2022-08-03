const Ika = require("ika");

const loginSch = Ika.object({
    email: Ika.string().email().required(),
    password: Ika.string().min(8).required()
})

module.exports = loginSch
