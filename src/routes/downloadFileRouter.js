const { Router } = require("express");
const downloadFileController = require("../controllers/downloadFileController.js");
const downloadFileRouter = Router();

downloadFileRouter.get("/:fileId", downloadFileController.downloadFileById);

module.exports = downloadFileRouter;
