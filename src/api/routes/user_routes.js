const { getUsers } = require("../controllers/user_ controller")

const userRouter = require("express").Router()

userRouter.get("/all", getUsers)

module.exports = userRouter