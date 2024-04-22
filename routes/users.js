const {createUser, getUser, getAllUsers, modifyUser} = require("../controllers/users")
const authenticate = require("../middlewares/authenticate")
const userRouter = require("express").Router()

userRouter.route("/users/create").post(createUser);
userRouter.route("/users/").get(getAllUsers);
userRouter.route("/users/:id").get(getUser).patch(authenticate, modifyUser);


module.exports = userRouter