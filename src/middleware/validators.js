const { body } = require("express-validator");
const userService = require("../services/userService");

const validateUsername = [
  body("username")
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters")
    .custom(async (username) => {
      const user = await userService.getUserByUsername(username);
      if (user) {
        throw new Error(`Username '${username}' already in use`);
      }
    }),
];

const validatePassword = [
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be greater than 10 characters")
    .custom((password, { req }) => {
      if (password.includes(req.body.username)) {
        throw new Error("Password should not contain the username");
      }
      return true;
    }),
];

module.exports = { validateUsername, validatePassword };
