const asyncHandler = require("express-async-handler");
const userService = require("../services/userService");

const getDashboardPage = asyncHandler(async (req, res) => {
  try {
    let folders = [];
    let viewing_folder = "Home";
    if (req.params.folderId) {
      folders = await userService.getFoldersByParentId(+req.params.folderId);
      viewing_folder = req.query.name;
    } else {
      folders = await userService.getAllFolders(req.user.id);
    }
    res.render("pages/dashboard", {
      user: req.user,
      folders: folders,
      viewing_folder: viewing_folder,
    });
  } catch (error) {
    throw new Error(`Couldn't get the dashboard page ${error}`);
  }
});

module.exports = { getDashboardPage };
