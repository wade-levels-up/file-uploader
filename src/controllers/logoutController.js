const asyncHandler = require("express-async-handler");

const logoutUser = asyncHandler(async (req, res) => {
  try {
    req.logOut((error) => {
      if (error) {
        throw new Error(`Couldn't log out ${error}`);
      }

      req.session.destroy((err) => {
        if (err) {
          console.error("Error destroying session:", err);
          return res.status(500).send("Error logging out");
        }

        res.clearCookie("connect.sid");
        res.redirect("/");
      });
    });
  } catch (error) {
    throw new Error(`Couldn't log out ${error}`);
  }
});

module.exports = { logoutUser };
