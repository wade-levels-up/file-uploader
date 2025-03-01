const asyncHandler = require("express-async-handler");
const userService = require("../services/userService");
const fs = require("fs"); // Temporary
const path = require("path"); // Temporary

const deleteFileById = asyncHandler(async (req, res) => {
  try {
    // Delete file record from the database
    await userService.deleteFileById(+req.body.file_id);
    if (!req.body.folder_id) {
      res.redirect("/dashboard");
    } else {
      const folder = await userService.getFolderById(+req.body.folder_id);
      res.redirect(
        `/dashboard/folder/${+req.body.folder_id}?name=${folder.name}`
      );
    }
  } catch (error) {
    throw new Error(`Couldn't delete file ${error}`);
  }
});

module.exports = { deleteFileById };
