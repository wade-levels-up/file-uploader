const asyncHandler = require("express-async-handler");

const getIndexPage = asyncHandler(async (req, res) => {
  try {
    if (req.user) {
      res.render("pages/index", { user: req.user });
    } else {
      res.render("pages/index");
    }
  } catch (error) {
    throw new Error(`Couldn't get the index page ${error}`);
  }
});

module.exports = { getIndexPage };
