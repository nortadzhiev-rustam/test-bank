const express = require("express");
const router = express.Router();
const multer = require("multer");
const controller = require("../controller/file-controller");
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
let upload = multer({ storage: storage });

router.use(express.static(__dirname + "/public"));
router.use("/uploads", express.static("uploads"));
router.delete("/files/:name", controller.remove);
router.post("/upload", upload.single("file"), async (req, res) => {
  res.status(200).send(req.file.filename || "");
});

module.exports = router;
