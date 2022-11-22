const express = require("express");
const { Department, User, Question, Test } = require("../models/");
const router = express.Router();

//route that registers departments
router.post("/departments", async (req, res) => {
  const { name } = req.body;
  try {
    const department = await Department.create(
      {
        name,
      },
      { include: [User] }
    );
    res.json({ department });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

//route that gets all departments
router.get("/departments", async (req, res) => {
  try {
    const departments = await Department.findAll({
      include: [
        { model: User, as: "Users" },
        { model: Question, as: "Questions" },
        { model: Test, as: "Tests" },
      ],
    });
    res.json(departments);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

//route for delete department
router.delete("/departments/:id", async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id);
    await department.destroy();
    res.json({ message: "Department deleted" });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

module.exports = router;
