const asyncHandler = require("express-async-handler");
const userService = require("../services/userService");

const renameFolder = asyncHandler(async (req, res) => {
  try {
    await userService.renameFolder(+req.body.folder_id, req.body.rename); // Will need to work out how to handle parent folders here too
    res.redirect("/dashboard");
  } catch (error) {
    throw new Error(`Couldn't rename folder ${error}`);
  }
});

module.exports = { renameFolder };
