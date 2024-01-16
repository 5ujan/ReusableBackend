const express= require('express')
const passport = require("passport")
const authRouter = express.Router()


const {auth, failure }= require("../controllers/auth")


authRouter.route('/').get(auth)
authRouter.route('/google/').get(passport.authenticate('google', {scope:['email', 'profile']}))
authRouter.route('/google/failure').get(failure)
// authRouter.route('/auth/register').post(register)
// authRouter.route('/auth/login').post(login)




module.exports = authRouter