const userRouter = require('express').Router()
const {modifyUser, deleteUser, getUser} = require("../controllers/user")


userRouter.route("/user/:userID").get(getUser);
userRouter.route("/user/modify").patch(modifyUser);
userRouter.route("/user/delete").delete(deleteUser);




module.exports =userRouter