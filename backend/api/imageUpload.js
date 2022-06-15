const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "../frontend/public/uploads/" });
const fs = require("fs");
const type = upload.single("upload");

router.post("/upload", type, async (req, res) => {
  const { file } = req;
  const { originalname, path } = file;
  const temp_path = path;
  const target_path = "../frontend/public/uploads/" + originalname;
  const src = fs.createReadStream(temp_path);
  const dest = fs.createWriteStream(target_path);
  src.pipe(dest);
  src.on("end", () => {
    fs.unlink(temp_path, (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
  src.on("error", (err) => {
    console.log(err);
  });
  res.status(200).json({
   uploaded: true,
   url: `http://localhost:3000/uploads/${originalname}`,
  });
});

module.exports = router;
