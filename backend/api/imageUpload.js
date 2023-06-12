const express = require("express");
const cors = require("cors");
const router = express.Router();
const multer = require("multer");
const controller = require("../controller/file-controller");

const corsOptions = {
  origin: "*", // allow requests from any origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // allow these methods
  preflightContinue: false,
  optionsSuccessStatus: 204
};

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../exam.rustamnortadzhiev.com/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
let upload = multer({ storage: storage });

router.use(cors(corsOptions)); // add CORS middleware to router
router.use(express.static(__dirname + "/public"));
router.use("/uploads", express.static("uploads"));
router.delete("/files/:name", controller.remove);
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    // The file is available as req.file
    console.log(req.file);

    // Send a success response
    res.status(200).send(req.file.filename || "");
  } catch (error) {
    // Handle any errors that occur during the file upload
    console.error(error);
    res.status(500).json({ message: 'An error occurred while uploading the file.' });
  }
});

module.exports = router;
