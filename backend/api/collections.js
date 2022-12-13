const express = require("express");
const { Test, Collection } = require("../models/");
const router = express.Router();

//route to post collections
router.post("/collection", async (req, res) => {
  const { name } = req.body;
  try {
    const collection = await Collection.create(
      {
        name,
      },
      { include: [Test] }
    );
    res.json({ collection });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

router.get("/collections", async (req, res) => {
  try {
    const collections = await Collection.findAll({
      include: [{ model: Test, as: "Tests" }],
    });
    res.json(collections);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});
