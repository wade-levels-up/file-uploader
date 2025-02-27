const { Router } = require("express");
const dashboardController = require("../controllers/dashboardController.js");
const dashboardRouter = Router();

dashboardRouter.get("/", dashboardController.getDashboardPage);

module.exports = dashboardRouter;
