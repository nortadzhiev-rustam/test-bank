const express = require("express");
const { Test, Collection } = require("../models/");
const router = express.Router();

//route to post collections
router.post("/collection", async (req, res) => {
  const { name, visibility, userId } = req.body;
  try {
    const collection = await Collection.create(
      {
        name, visibility, userId
      },
      { include: [{ model: Test, as: "Tests" }] }
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

router.put("/collection/:id", async (req, res) => {
  console.log(req.query);
  try {
    const updatedCollection = await Collection.update(req.query, {
      returning: true,
      where: { id: req.params.id },
    });
    res
      .status(200)
      .json({ message: "Collection was updated successfully", updatedCollection });
  } catch (err) {
    res.status(500).json({ message: `Something went wrong: ${err}` });
  }
});

router.delete("/collection/:id", async (req, res) => {
  try {
    const collection = await Collection.findByPk(req.params.id);
    await collection.destroy();
    res.json({ message: "Collection deleted" });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

module.exports = router;
