const multer = require("multer");
const path = require("path");

// Configure how the files are stored
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the correct relative path for the destination directory
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

// File filtering function
const fileFilter = (req, file, cb) => {
  // Check for allowed mimetypes
  const allowedMimeTypes = ["image/jpeg", "image/png", "application/pdf"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG, and PDF files are allowed."), false);
  }
};

// Create the multer upload middleware
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB file size limit
  },
  fileFilter: fileFilter,
});

module.exports = upload;
