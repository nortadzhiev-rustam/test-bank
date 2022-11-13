const express = require("express");
const { Question, Test, Department, User } = require("../models/");
const router = express.Router();

//route that posts test
router.post("/test", async (req, res) => {
  try {
    const { id, userId, departmentId, name } = req.body;
    const newTest = await Test.create(
      { id, name, userId, departmentId },
      { include: [{ model: Question, as: "questions" }] }
    );

    res
      .status(200)
      .json({ message: "Test was successfully created", test: newTest });
  } catch (err) {
    res.status(500).json({ message: `Something went wrong: ${err}` });
  }
});

router.put("/test/:id", async (req, res) => {
  console.log(req.body.grade)
  try {
    const updatedTest = await Test.update(
      { grade: req.body.grade },
      { returning: true, where: { id: req.params.id } }
    );
    res
      .status(200)
      .json({ message: "Test was updated successfully", updatedTest });
  } catch (err) {
    res.status(500).json({ message: `Something went wrong: ${err}` });
  }
});

//route to get all tests
router.get("/tests", async (req, res) => {
  try {
    const test = await Test.findAll({
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
          as: "questions",
        },
      ],
    });
    res.status(200).json(test);
  } catch (err) {
    res.status(500).json({ message: `Something went wrong: ${err}` });
  }
});

router.get("/test/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const test = await Test.findOne({
      where: {
        id: id,
      },
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
          as: "questions",
        },
      ],
    });
    res.status(200).json(test);
  } catch (err) {
    res.status(500).json({ message: `Something went wrong: ${err}` });
  }
});

module.exports = router;
