const { Router } = require("express");
const deleteFolderController = require("../controllers/deleteFolderController.js");
const deleteFolderRouter = Router();

deleteFolderRouter.post("/", deleteFolderController.deleteFolder);

module.exports = deleteFolderRouter;
