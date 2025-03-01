const asyncHandler = require("express-async-handler");
const userService = require("../services/userService");

const deleteFolder = asyncHandler(async (req, res) => {
  try {
    await userService.deleteFolder(+req.body.folder_id); // Will need to work out how to handle parent folders here too
    res.redirect("/dashboard");
  } catch (error) {
    throw new Error(`Couldn't create new folder ${error}`);
  }
});

module.exports = { deleteFolder };
