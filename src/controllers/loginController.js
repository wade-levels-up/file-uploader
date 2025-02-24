const passport = require("passport");

function verifyLogin(req, res, next) {
  passport.authenticate("local", (error, user) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      // Authentication failed, re-render the homepage with an error message
      return res.render("pages/index", {
        error: "Invalid username or password",
      });
    }
    req.logIn(user, (error) => {
      if (error) {
        return next(error);
      }
      // Authentication succeeded, redirect to /main
      return res.redirect("/");
    });
  })(req, res, next);
}

module.exports = { verifyLogin };
