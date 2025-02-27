const asyncHandler = require("express-async-handler");

const getDashboardPage = asyncHandler(async (req, res) => {
  try {
    res.render("pages/dashboard", { user: req.user });
  } catch (error) {
    throw new Error(`Couldn't get the dashboard page ${error}`);
  }
});

module.exports = { getDashboardPage };
