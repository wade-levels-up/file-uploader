const { Router } = require("express");
const signUpController = require("../controllers/signUpController.js");
const signUpRouter = Router();

signUpRouter.get("/", signUpController.getSignUpPage);
signUpRouter.post("/", signUpController.createNewUser);

module.exports = signUpRouter;
