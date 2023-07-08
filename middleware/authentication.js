const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { UnauthenticatedError } = require('../middleware/handleErrors')


const authenticate = async(req, res, next)=>{
    const authHeader =  req.headers.authorization
    
    if(!authHeader|| !authHeader.startsWith('Bearer')){
        next(new UnauthenticatedError("Missing JWT"));
        return
    }
    
        const token= authHeader.split(' ')[1]
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decoded)
            const {userID, name }= decoded
            req.user = {userID, name}
            next()
        } catch (error) {
            console.log(error)
        }
    
}

module.exports = authenticate