const { Router } = require("express");
const logoutController = require("../controllers/logoutController.js");
const logoutRouter = Router();

logoutRouter.get("/", logoutController.logoutUser);

module.exports = logoutRouter;
