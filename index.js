const express = require("express")
const bikesRouter = require("./src/api/routes/bike_routes")
const makerRouter = require("./src/api/routes/maker_routes")
const { connectDB } = require("./src/config/db")
const { feedBikes } = require("./src/seeds/bikes.seed")
const { feedMakers } = require("./src/seeds/makers.seed")
const { feedUsers } = require("./src/seeds/users.seed")

require("dotenv").config()

const app = express()
connectDB()
app.use(express.json())

feedMakers()
feedBikes()
feedUsers()

app.use("/api/v01/bikes", bikesRouter)
app.use("/api/v01/makers", makerRouter)

app.use("*", (req, res, next) => {
    return res.status(404).json(`route not found`)
})

app.listen(3000, () => {
    console.log(`server launched at: http://localhost:3000`)
})