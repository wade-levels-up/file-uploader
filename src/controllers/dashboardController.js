const asyncHandler = require("express-async-handler");
const userService = require("../services/userService");

const getDashboardPage = asyncHandler(async (req, res) => {
  try {
    let folders = [];
    let viewing_folder;
    if (req.params.folderId) {
      folders = await userService.getFoldersByParentId(+req.params.folderId);
      viewing_folder = req.query.name;
    } else {
      folders = await userService.getAllFolders(req.user.id);
    }

    const files = await userService.getFilesByFolderId(+req.params.folderId);

    res.render("pages/dashboard", {
      user: req.user,
      files: files,
      folders: folders,
      viewing_folder: viewing_folder,
    });
  } catch (error) {
    throw new Error(`Couldn't get the dashboard page ${error}`);
  }
});

module.exports = { getDashboardPage };
