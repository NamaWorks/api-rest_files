const { getUsers, userSignUp, userLogin, deleteUserById, updateUserById } = require("../controllers/user_ controller")

const userRouter = require("express").Router()

userRouter.get("/all", getUsers)
userRouter.post("/signup", userSignUp)
userRouter.post("/login", userLogin)
userRouter.put("/id/:id", updateUserById)
userRouter.delete("/id/:id", deleteUserById)


module.exports = userRouter