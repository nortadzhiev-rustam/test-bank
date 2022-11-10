const express = require("express");
const { Question, Test, Department, User } = require("../models/");
const router = express.Router();

//route that posts test
router.post("/test", async (req, res) => {
  try {
    const { userId, departmentId, name } = req.body;
    const newTest = await Test.create(
      { name, userId, departmentId },
      { include: [Question] }
    );

    res
      .status(200)
      .json({ message: "Test was successfully created", test: newTest });
  } catch (err) {
    res.status(500).json({ message: `Something went wrong: ${err}` });
  }
});

//route to get all tests
router.get("/tests", async (req, res) => {
  try {
    Test.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "firstName", "lastName"],
        },
        {
          model: Department,
          as: "department",
          attributes: ["id", "name"],
        },
        {
          model: Question,
          as: "Question",
        },
      ],
    });
  } catch (err) {}
});

module.exports = router;
