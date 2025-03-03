const asyncHandler = require("express-async-handler");
const userService = require("../services/userService");
const supabase = require("../utils/supabaseClient");

const deleteFolder = asyncHandler(async (req, res) => {
  try {
    const files = await userService.getFilesByFolderId(+req.body.folder_id);
    let filePaths = [];
    files.forEach((file) => {
      filePaths.push(file.relativePath);
    });
    await supabase.storage.from("file_uploader").remove(filePaths);

    await userService.deleteFolder(+req.body.folder_id);
    res.redirect("/dashboard");
  } catch (error) {
    throw new Error(`Couldn't delete folder ${error}`);
  }
});

module.exports = { deleteFolder };
