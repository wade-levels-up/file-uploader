const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({ storage: storage, limits: { fileSize: 10000000 } }); // Limits files less than 10mb

module.exports = upload;
