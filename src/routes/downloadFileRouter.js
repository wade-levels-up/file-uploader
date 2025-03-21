const { Router } = require("express");
const downloadFileController = require("../controllers/downloadFileController.js");
const downloadFileRouter = Router();
const { isFileOwner } = require("../middleware/ensureAuthenticated.js");

downloadFileRouter.get(
  "/:fileId",
  isFileOwner,
  downloadFileController.downloadFileById
);

module.exports = downloadFileRouter;
