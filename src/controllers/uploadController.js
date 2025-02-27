const asyncHandler = require("express-async-handler");

const uploadFile = asyncHandler(async (req, res) => {
  try {
    console.log(
      `File: ${req.file.originalname} | Size: ${req.file.size} | Type: ${req.file.mimetype}`
    );
    res.redirect("/");
  } catch (error) {
    throw new Error(`Couldn't log out ${error}`);
  }
});

module.exports = { uploadFile };
