const { isAuth } = require("../../middlewares/auth")
const { upload } = require("../../middlewares/files.middlewares")
const { isAdmin } = require("../../middlewares/is-admin")
const { getUsers, userSignUp, userLogin, deleteUserById, updateUserById } = require("../controllers/user_ controller")

const userRouter = require("express").Router()

userRouter.get("/all", [isAdmin], getUsers)
userRouter.post("/signup", upload.single("image"), userSignUp)
userRouter.post("/login", userLogin)
userRouter.put("/id/:id", [isAdmin], upload.single("image"), updateUserById)
userRouter.delete("/id/:id", [isAdmin], deleteUserById)


module.exports = userRouter