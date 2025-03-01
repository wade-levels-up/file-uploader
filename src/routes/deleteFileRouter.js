const { Router } = require("express");
const deleteFileController = require("../controllers/deleteFileController.js");
const deleteFileRouter = Router();

deleteFileRouter.post("/", deleteFileController.deleteFileById);

module.exports = deleteFileRouter;
