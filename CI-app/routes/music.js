const express = require("express");
const multer = require("multer");
const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Upload music file
router.post("/upload", upload.single("file"), (req, res) => {
  const { originalname, path } = req.file;
  res.json({ message: "File uploaded successfully!", file: originalname, path });
});

router.get("/", (req, res) => {
  res.json({ message: "List of music files" });
});

module.exports = router;
