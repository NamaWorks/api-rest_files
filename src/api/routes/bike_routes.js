const { bikesPong, getBikes } = require("../controllers/bike_controller")

const bikesRouter = require("express").Router()

bikesRouter.get("/all", getBikes)
bikesRouter.get("/ping", bikesPong)

module.exports = bikesRouter
