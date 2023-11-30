require('dotenv').config()
const express = require('express')
const app= express();

//middlewares
const passport = require('passport')
const connectDB=require('./db/connect')
const {errorHandler} = require('./middleware/handleErrors')
const authRouter= require("./routes/auth");
const mainRouter= require("./routes/main");
const authenticate = require('./middleware/authentication');
require('./g-auth')

app.use(express.json())
app.use('/auth',  authRouter)         //login or register, doesn't require authentication
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/google/failure",
  })
);

app.use('/dashboard',  mainRouter)


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