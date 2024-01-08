const upload = require("../Middleware/multer");
const express = require("express");

const {getItems, addItem, downloadFile} = require("../controllers/Item");

const router = express.Router();

router.route("/").get(getItems).post(upload.single("file"),addItem);

router.route("/download/:id").get(downloadFile);

module.exports = router;

const app = express();

app.post('/upload', upload.single('file'), (req, res) => {
  // Access the uploaded file details
  const { filename, path, mimetype, size } = req.file;

  // Process or store the file as needed
  // Example: Print the file details
  console.log('Uploaded file details:');
  console.log('Filename:', filename);
  console.log('Path:', path);
  console.log('Mimetype:', mimetype);
  console.log('Size:', size);

  // Send a response back to the client
  res.status(200).json({ message: 'File uploaded successfully!' });
});