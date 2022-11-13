const express = require("express");
const { Department, User, Question, Test } = require("../models");
const router = express.Router();
const multer = require("multer");

router.use(express.static(__dirname + "/public"));
router.use("/uploads", express.static("uploads"));

router.post("/question", async (req, res) => {
  try {
    const {
      category,
      title,
      question,
      answers,
      image,
      correctAnswer,
      difficulty,
      grade,
      mark,
      userId,
      departmentId,
      type,
      testId,
    } = req.body;
    if (question !== "") {
      const newQuestion = await Question.create({
        title,
        category,
        question: JSON.stringify(question),
        options: JSON.stringify(answers),
        image,
        correctAnswer: JSON.stringify(correctAnswer),
        difficulty,
        grade,
        mark,
        type,
        userId,
        departmentId,
        testId,
      });

      res.status(200).json({
        message: "question is assigned successfully!",
        question: newQuestion,
      });
    } else {
      res.status(400).json({ message: "Question is empty" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//route to get all questions
router.get("/questions", async (req, res) => {
  try {
    const questions = await Question.findAll({
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
        { model: Test, as: "test" },
      ],
    });
    res.json(questions);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

module.exports = router;
