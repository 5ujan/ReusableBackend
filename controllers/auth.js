const User = require("../models/User")
const {BadRequestError, NotFoundError, UnauthenticatedError} = require('../middleware/handleErrors')


const register = async(req, res, next)=>{
    const {name, email, password, isOrg} = req.body
    const alreadyExists = await User.findOne({email})
    if(alreadyExists){
        
        next(new BadRequestError("Account with the email already exists"))
         
    }else{
        const user= await User.create({name, email, password, isOrg})
        const token= await user.createJWT()

        res.json({name: user.name, token})
    }
}

const login = async(req, res, next)=>{
    const  {email, password } = req.body
    const user = await User.findOne({email})
    if(!user){
        
        next(new NotFoundError("Account with the email doesn't exists"));

    }else{
        if(!user.verifyPassword(password)){
            next(new UnauthenticatedError("Wrong password"))
        }
        const token = await user.createJWT()
        res.json({name: user.name, token})
    }
}



module.exports = {register, login}