const asyncHandler = require("express-async-handler");
const userService = require("../services/userService");
const supabase = require("../utils/supabaseClient");
const axios = require("axios");

const downloadFileById = asyncHandler(async (req, res) => {
  try {
    const file = await userService.getFileById(+req.params.fileId);

    const { data, error } = await supabase.storage
      .from("file_uploader")
      .createSignedUrl(file.relativePath, 180); // URL valid for 3 minutes (180 seconds)

    if (error) {
      throw new Error(`Supabase signed URL error: ${error.message}`);
    }

    const response = await axios.get(data.signedUrl, {
      responseType: "stream",
    });

    res.setHeader("Content-Disposition", `attachment; filename="${file.name}"`);
    res.setHeader("Content-Type", file.type);

    response.data.pipe(res);
  } catch (error) {
    throw new Error(`Couldn't download file ${error}`);
  }
});

module.exports = { downloadFileById };
