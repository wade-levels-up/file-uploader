const asyncHandler = require("express-async-handler");
const userService = require("../services/userService");

const getSignUpPage = asyncHandler(async (req, res) => {
  try {
    res.render("pages/sign-up");
  } catch (error) {
    throw new Error(`Couldn't get the sign up page ${error}`);
  }
});

const createNewUser = asyncHandler(async (req, res) => {
  try {
    await userService.createNewUser(req.body.username, req.body.password);
    res.redirect("/");
  } catch (error) {
    throw new Error(`Couldn't create new user ${error}`);
  }
});

module.exports = { createNewUser, getSignUpPage };
