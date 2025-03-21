const database = require("../services/userService");

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

// async function isFileOwner(req, res, next) {
//   const requestedFile = await database.getFileById(+req.params.fileId);
//   if (req.user && req.user.id === +requestedFile.userId) {
//     return next();
//   }
//   return res.render("pages/error", { title: "Unauthorized" }); // Route for not authenticated
// }

async function isFileOwner(req, res, next) {
  try {
    const fileId = parseInt(req.params.fileId, 10);
    if (isNaN(fileId)) {
      console.error("Invalid file ID:", req.params.fileId);
      return res.render("pages/error", { title: "Invalid File ID" });
    }

    console.log("File ID:", fileId);
    const requestedFile = await database.getFileById(fileId);
    if (!requestedFile) {
      console.error("File not found:", fileId);
      return res.render("pages/error", { title: "File Not Found" });
    }

    console.log("Requested File User ID:", requestedFile.userId);
    console.log("Current User ID:", req.user.id);
    if (req.user && req.user.id === requestedFile.userId) {
      return next();
    }

    console.error("Unauthorized access attempt by user:", req.user.id);
    return res.render("pages/error", { title: "Unauthorized" }); // Route for not authenticated
  } catch (error) {
    console.error("Error in isFileOwner middleware:", error);
    res.render("pages/error", { title: "Error", error: error.message });
  }
}

module.exports = { isAuth, isAdmin, isFileOwner };
