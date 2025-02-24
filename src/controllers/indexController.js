const asyncHandler = require("express-async-handler");

const getIndexPage = asyncHandler(async (req, res) => {
  try {
    res.render("pages/index", { user: req.user });
  } catch (error) {
    throw new Error(`Couldn't get the index page ${error}`);
  }
});

module.exports = { getIndexPage };
