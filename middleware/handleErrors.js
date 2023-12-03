const {StatusCodes}= require("http-status-codes")


class NotFoundError extends Error{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.NOT_FOUND
    }
}
class BadRequestError extends Error{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}
class  UnauthenticatedError extends Error{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

const errorHandler = (err, req, res, next)=>{
    
    const statusCode = err.statusCode|| StatusCodes.INTERNAL_SERVER_ERROR
    res.json({error:{msg:`${statusCode===500?"Internal server Error":err.message}`, statusCode}})

}

module.exports ={errorHandler, UnauthenticatedError, BadRequestError, NotFoundError }
