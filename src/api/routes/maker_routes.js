const { isAuth } = require("../../middlewares/auth");
const { isAdmin } = require("../../middlewares/is-admin");
const { getMakers, getMakerByName, getMakerById, postMaker, removeMaker, updateMaker, getMakerByYear } = require("../controllers/maker_controller");

const makerRouter = require("express").Router()

makerRouter.get("/all", getMakers)
makerRouter.get("/year/:year", getMakerByYear)
makerRouter.get("/:makerName", getMakerByName)
makerRouter.get("/id/:_id", getMakerById)
makerRouter.post("/",[isAuth], postMaker)
makerRouter.delete("/id/:id",[isAdmin], removeMaker)
makerRouter.put("/id/:id",[isAdmin], updateMaker)

module.exports = makerRouter