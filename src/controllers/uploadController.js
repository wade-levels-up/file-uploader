const asyncHandler = require("express-async-handler");
const userService = require("../services/userService");

const uploadFile = asyncHandler(async (req, res) => {
  try {
    let upload_destination = req.body.upload_destination;
    const viewing_folder = await userService.getFolderById(
      +req.body.upload_destination
    );

    await userService.createNewFile(
      req.file.originalname,
      req.file.mimetype,
      req.file.size,
      req.file.destination,
      +upload_destination,
      req.user.id
    );
    console.log(
      `File: ${req.file.originalname} Size: ${req.file.size} Type: ${req.file.mimetype}`
    );

    if (upload_destination) {
      res.redirect(
        `/dashboard/folder/${upload_destination}?name=${viewing_folder.name}`
      );
    } else {
      res.redirect("/dashboard");
    }
  } catch (error) {
    throw new Error(`Couldn't log out ${error}`);
  }
});

module.exports = { uploadFile };
