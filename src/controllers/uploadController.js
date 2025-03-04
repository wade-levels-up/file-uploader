const asyncHandler = require("express-async-handler");
const userService = require("../services/userService");
const supabase = require("../utils/supabaseClient");

const uploadFile = asyncHandler(async (req, res) => {
  try {
    let upload_destination = req.body.upload_destination;
    let viewing_folder;
    if (req.body.upload_destination !== "Home") {
      viewing_folder = await userService.getFolderById(
        +req.body.upload_destination
      );
    }

    // Supabase

    const filePath = `${req.user.username}-${req.user.id}-${Date.now()}-${
      req.file.originalname
    }`;
    const { data, error } = await supabase.storage
      .from("file_uploader")
      .upload(filePath, req.file.buffer);

    if (error) {
      throw new Error(`Supabase upload error: ${error.message}`);
    }

    // Storing meta-data in local PostgreSQL database

    await userService.createNewFile(
      req.file.originalname,
      req.file.mimetype,
      req.file.size,
      filePath,
      +upload_destination,
      req.user.id
    );

    if (upload_destination !== "Home") {
      res.redirect(
        `/dashboard/folder/${upload_destination}?name=${viewing_folder.name}`
      );
    } else {
      res.redirect("/dashboard");
    }
  } catch (error) {
    throw new Error(`Couldn't upload file ${error}`);
  }
});

module.exports = { uploadFile };
