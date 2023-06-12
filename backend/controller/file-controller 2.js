const fs = require("fs");

const remove = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __dirname + "/../../frontend/public/uploads/";

  fs.unlink(directoryPath + fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not delete the file. " + err,
      });
    }

    res.status(200).send({
      message: "File is deleted successfully.",
    });
  });
};

module.exports = {
  remove,
};
