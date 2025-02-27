const { Router } = require("express");
const uploadController = require("../controllers/uploadController.js");
const uploadRouter = Router();
const upload = require("../middleware/uploadMiddleware.js");

uploadRouter.post("/", upload.single("file"), uploadController.uploadFile);

module.exports = uploadRouter;
