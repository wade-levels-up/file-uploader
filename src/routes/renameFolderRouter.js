const { Router } = require("express");
const renameFolderController = require("../controllers/renameFolderController.js");
const renameFolderRouter = Router();

renameFolderRouter.post("/", renameFolderController.renameFolder);

module.exports = renameFolderRouter;
