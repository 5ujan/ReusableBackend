const User = require("../models/User");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../middleware/handleErrors");

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
      passReqToCallback: true,
    },
    async function (profile, done) {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = await User.create({
          googleId: profile.id,
          email: profile.email,
          name: profile.displayName,
        });

        return done(null, newUser);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

// const register = async(req, res, next)=>{
//     const {name, email, password, isOrg} = req.body
//     const alreadyExists = await User.findOne({email})
//     if(alreadyExists){

//         next(new BadRequestError("Account with the email already exists"))

//     }else{
//         const user= await User.create({name, email, password, isOrg})
//         const token= await user.createJWT()

//         res.json({name: user.name, token})
//     }
// }

// const login = async(req, res, next)=>{
//     const  {email, password } = req.body
//     const user = await User.findOne({email})
//     if(!user){

//         next(new NotFoundError("Account with the email doesn't exists"));

//     }else{
//         if(!user.verifyPassword(password)){
//             next(new UnauthenticatedError("Wrong password"))
//         }
//         const token = await user.createJWT()
//         res.json({name: user.name, token})
//     }
// }
