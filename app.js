require('dotenv').config()
const express = require('express')
const app= express();

//middlewares
const connectDB=require('./db/connect')
const {errorHandler} = require('./middleware/handleErrors')
const authRouter= require("./routes/auth");
const mainRouter= require("./routes/main");
const authenticate = require('./middleware/authentication');


app.use(express.json())
app.use('/',  authRouter)         //login or register, doesn't require authentication
app.use('/', authenticate, mainRouter)


app.use(errorHandler);

const start=async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(5000, ()=>{
            console.log("server listening")
            
        })
    }
    catch (error) {
    }
}
    
start()