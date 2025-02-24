const { Router } = require("express");
const loginController = require("../controllers/loginController.js");
const loginRouter = Router();

loginRouter.post("/", loginController.verifyLogin);

module.exports = loginRouter;
