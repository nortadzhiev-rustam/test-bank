const express = require("express");
const router = express.Router();
const multer = require("multer");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
let upload = multer({ storage: storage });

router.use(express.static(__dirname + "/public"));
router.use("/uploads", express.static("uploads"));

router.post("/upload", upload.single('file'), async (req, res) => {
  console.log(JSON.stringify(req.file.image));
});

module.exports = router;
