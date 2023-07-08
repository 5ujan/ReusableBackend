const express= require('express')
const authRouter = express.Router()


const {register, login} = require("../controllers/auth")

authRouter.route('/auth/register').post(register)
authRouter.route('/auth/login').post(login)


module.exports = authRouter