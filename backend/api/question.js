const express = require("express");
const { Department, User, Question } = require("../models");
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
    } = req.body;
    if (question !== "") {
      const newQuestion = await Question.create({
        title,
        category,
        question,
        option1: answers[0].answer,
        option2: answers[1].answer,
        option3: answers[2].answer,
        option4: answers[3].answer,
        image,
        correctAnswer,
        difficulty,
        grade,
        mark,
        type,
        userId,
        departmentId,
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
    const test = await Question.findAll({
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
      ],
    });
    res.json(test);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

module.exports = router;
