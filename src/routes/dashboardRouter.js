const { Router } = require("express");
const dashboardController = require("../controllers/dashboardController.js");
const dashboardRouter = Router();

dashboardRouter.get("/", dashboardController.getDashboardPage);
dashboardRouter.get("/folder/:folderId", dashboardController.getDashboardPage);
dashboardRouter.get("/file/:fileId", dashboardController.getDashboardPage);

module.exports = dashboardRouter;
