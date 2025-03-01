const { Router } = require("express");
const newFolderController = require("../controllers/newFolderController.js");
const newFolderRouter = Router();

newFolderRouter.post("/", newFolderController.createNewFolder);

module.exports = newFolderRouter;
