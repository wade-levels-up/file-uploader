const asyncHandler = require("express-async-handler");

const logoutUser = asyncHandler(async (req, res) => {
  try {
    req.logOut((error) => {
      if (error) {
        throw new Error(`Couldn't log out ${error}`);
      }
    });
    res.redirect("/");
  } catch (error) {
    throw new Error(`Couldn't log out ${error}`);
  }
});

module.exports = { logoutUser };
