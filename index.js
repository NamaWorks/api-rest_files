const express = require("express")
const bikesRouter = require("./src/api/routes/bike_routes")
const makerRouter = require("./src/api/routes/maker_routes")
const userRouter = require("./src/api/routes/user_routes")
const cors = require("cors");
const { connectDB } = require("./src/config/db")
const cloudinary = require("cloudinary").v2

require("dotenv").config()

const app = express()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_API_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.use(express.json())
app.use(cors());

connectDB()

app.use("/api/v01/makers", makerRouter)
app.use("/api/v01/bikes", bikesRouter)
app.use("/api/v01/users", userRouter)

app.use("*", (req, res, next) => {
    return res.status(404).json(`route not found`)
})

app.listen(3000, () => {
    console.log(`server launched at: http://localhost:3000`)
})