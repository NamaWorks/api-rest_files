const { isAuth } = require("../../middlewares/auth")
const { isAdmin } = require("../../middlewares/is-admin")
const { getUsers, userSignUp, userLogin, deleteUserById, updateUserById } = require("../controllers/user_ controller")

const userRouter = require("express").Router()

userRouter.get("/all", [isAdmin], getUsers)
userRouter.post("/signup", userSignUp)
userRouter.post("/login", userLogin)
userRouter.put("/id/:id", [isAuth], updateUserById)
userRouter.delete("/id/:id", [isAdmin], deleteUserById)


module.exports = userRouter