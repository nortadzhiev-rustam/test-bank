const express = require('express');
const { Department, User } = require('../models/');
const router = express.Router();
const {isAuth} = require('../middlewares');
//route that registers departments
router.post("/departments",  async (req, res) => {
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
        include: { model: User },
      });
      res.json(departments);
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  });

  module.exports = router;

