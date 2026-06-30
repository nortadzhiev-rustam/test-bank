const fs = require("fs");
const path = require("path");

const UPLOADS_DIR = path.resolve(__dirname, "../../frontend/public/uploads");

const remove = (req, res) => {
  const fileName = path.basename(req.params.name);
  const filePath = path.join(UPLOADS_DIR, fileName);

  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).send({
        message: "Could not delete the file. " + err,
      });
    }

    return res.status(200).send({
      message: "File is deleted successfully.",
    });
  });
};

module.exports = {
  remove,
};
