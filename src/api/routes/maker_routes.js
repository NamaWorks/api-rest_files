const { getMakers, getMakerByName, getMakerById, postMaker, removeMaker, updateMaker, getMakerByYear } = require("../controllers/maker_controller");

const makerRouter = require("express").Router()

makerRouter.get("/all", getMakers)
makerRouter.get("/year/:year", getMakerByYear)
makerRouter.get("/:makerName", getMakerByName)
makerRouter.get("/id/:_id", getMakerById)
makerRouter.post("/", postMaker)
makerRouter.delete("/id/:id", removeMaker)
makerRouter.put("/id/:id", updateMaker)

module.exports = makerRouter