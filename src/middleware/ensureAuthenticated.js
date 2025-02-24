function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.render("pages/error", { title: "Unauthorized" }); // Route for not authenticated
}

function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.isAdmin) {
    return next();
  }
  res.render("pages/error", { title: "Unauthorized" }); // Route for not authenticated
}

module.exports = { isAuth, isAdmin };
