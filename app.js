require('dotenv').config()
const express = require('express')
const app= express();

//middlewares
const connectDB=require('./db/connect')
const {errorHandler} = require('./middleware/handleErrors')
const authRouter= require("./routes/auth");
const mainRouter= require("./routes/main");
const userRouter= require("./routes/user");
const authenticate = require('./middleware/authentication');


app.use(express.json({limit: '25mb'}));
app.use('/',  authRouter)         //login or register, doesn't require authentication
app.use('/', authenticate, mainRouter, userRouter)


app.use(errorHandler);

const start=async()=>{
    try {
        const port = 5000
        await connectDB(process.env.MONGO_URI)
        app.listen(port, ()=>{
            console.log("server listening on port "+port)
            
        })
    }
    catch (error) {
        errorHandler(error);
    }
}
    
start()