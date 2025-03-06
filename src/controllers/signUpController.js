const asyncHandler = require("express-async-handler");
const userService = require("../services/userService");
const { validationResult } = require("express-validator");
const {
  validateUsername,
  validatePassword,
} = require("../middleware/validators");

const getSignUpPage = asyncHandler(async (req, res) => {
  try {
    res.render("pages/sign-up");
  } catch (error) {
    throw new Error(`Couldn't get the sign up page ${error}`);
  }
});

const createNewUser = [
  validateUsername,
  validatePassword,
  asyncHandler(async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("pages/sign-up", {
          errors: errors.array(),
        });
      }

      await userService.createNewUser(req.body.username, req.body.password);
      res.redirect("/");
    } catch (error) {
      throw new Error(`Couldn't create new user ${error}`);
    }
  }),
];

module.exports = { createNewUser, getSignUpPage };
