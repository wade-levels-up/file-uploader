const asyncHandler = require("express-async-handler");
const userService = require("../services/userService");

const createNewFolder = asyncHandler(async (req, res) => {
  try {
    await userService.createNewFolder(req.body.folder, req.user.id); // Will need to work out how to handle parent folders here too
    res.redirect("/dashboard");
  } catch (error) {
    throw new Error(`Couldn't create new folder ${error}`);
  }
});

module.exports = { createNewFolder };
