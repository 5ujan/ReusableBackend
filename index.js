require("dotenv").config()

const express = require("express")
const app = express();
const session = require("express-session");
const fileupload = require("express-fileupload");
const passport = require("./middlewares/passport");
const cors = require('cors')
const errorHandler = require("./middlewares/errorHandler");
// const OAuth2Strategy = require("passport-google-oauth2").Strategy;

const connectDB = require("./db/connect")
const authRouter = require("./routes/auth");
const {viewRouter, modifyRouter} = require("./routes/blog");
const authenticate = require("./middlewares/authenticate");
const userRouter = require('./routes/users')
// const User = require("./models/User");
const imageRouter = require("./routes/image");
app.use(
  cors({
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);


app.use(express.json()); 

app.use(fileupload({
    useTempFiles: true
}))


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days (adjust as needed)
    },
  })
  );
  
  // setuppassport
  
  app.use(passport.initialize());
  app.use(passport.session());
  
  app.use("/",authRouter, viewRouter, userRouter,imageRouter)
  app.use("/", authenticate, modifyRouter)
  app.use("/", errorHandler)

const start = async()=>{
    try{
        await connectDB();
        app.listen(process.env.PORT, ()=>console.log("Server listening on port "+ process.env.PORT))
    }
    catch(error){
        console.log(error)
    }
}

start()



// passport.use(
//     new OAuth2Strategy({
//         clientID:process.env.CLIENT_ID,
//         clientSecret:process.env.CLIENT_SECRET,
//         callbackURL:"/auth/google/callback",
//         scope:["profile","email"]
//     },
//     async(accessToken,refreshToken,profile,done)=>{
//         try {
//             let user = await User.findOne({ email: profile.emails[0].value });

//             if(!user){
//                 user = await User.create({
//                     googleId:profile.id,
//                     name:profile.displayName,
//                     email:profile.emails[0].value,
//                     avatar:profile.photos[0].value
//                 });

//             }
//             console.log(user)
//             return done(null,user)
//         } catch (error) {
//             return done(error,null)
//         }
//     }
//     )
// )

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });
// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "http://localhost:5173/success",
//     failureRedirect: "http://localhost:5173/failure",
//   })
// );
// app.get("/login/sucess", async (req, res) => {
//   if (req.user) {
//     res.status(200).json({ message: "user Login", user: req.user });
//   } else {
//     res.status(400).json({ message: "Not Authorized" });
//   }
// });
// app.get("/logout", (req, res, next) => {
//   req.logout(function (err) {
//     if (err) {
//       return next(err);
//     }
//     res.redirect("http://localhost:3001");
//   });
// });
