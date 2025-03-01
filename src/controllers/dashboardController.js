const asyncHandler = require("express-async-handler");
const userService = require("../services/userService");

const getDashboardPage = asyncHandler(async (req, res) => {
  try {
    const folders = await userService.getAllFolders(req.user.id);
    res.render("pages/dashboard", {
      user: req.user,
      folders: folders,
    });
  } catch (error) {
    throw new Error(`Couldn't get the dashboard page ${error}`);
  }
});

module.exports = { getDashboardPage };
