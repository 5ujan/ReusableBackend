const authRouter = require("express").Router();
const passport = require("../middlewares/passport");
const jwt= require("jsonwebtoken")

const createJWT = async(user)=>{
  const token =  jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "7d" });
  return token;
}

authRouter
  .route("/auth/google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));

  authRouter.route("/auth/google/callback").get(
    passport.authenticate("google", {
      session: true,
      successRedirect: "/profile",
      failureRedirect: "your-frontend-root-url",
    })
  );

authRouter.route("/profile").get(async (req, res)=>{
  const token = await createJWT(req.user)
  res.send(
    `<script>
   window.opener.postMessage(${JSON.stringify({ //sends message to the original window, message contains token
     token,
     userID: req.user._id,
   })}, 'your-frontend-root-url'); 
        window.close();
        </script>
`);
}
)
//be sure to add a listener to frontend fronm where login route is hit as follows
// const handleLogin = async () => {
//                                                   // Open the authentication window that sends a message 
//   const authWindow = window.open(
//     "<root-backend>/auth/google",
//     "_blank",
//     "width=600, height=400"
//   );
//   // Listen for the message from the authentication window
//   window.addEventListener("message", (event) => {
//     if (event.source === authWindow) {
//       const jsonData = event.data;                                      //relevant data in event.data
//       localStorage.setItem("info", JSON.stringify(jsonData));          //save to localStorage of the calling window(site data)
//       authWindow.close();
//       setData();                                                       //for immediate changes
//     }
//   });
// };


authRouter.route("/logout").get((req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("your-frontend-root-url");
  });
});

module.exports = authRouter;
