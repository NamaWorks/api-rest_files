const express = require("express")
const bikesRouter = require("./src/api/routes/bike_routes")
const { connectDB } = require("./src/config/db")

require("dotenv").config()

const app = express()
connectDB()
app.use(express.json())

app.use("/api/v01/bikes", bikesRouter)

app.use("*", (req, res, next) => {
    return res.status(404).json(`route not found`)
})

app.listen(3000, () => {
    console.log(`server launched at: http://localhost:3000`)
})