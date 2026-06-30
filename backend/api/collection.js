const express = require("express");
const { Collection, Test } = require("../models/");
const router = express.Router();

//route that gets all collections for the logged-in user (with their tests)
router.get("/collections", async (req, res) => {
  try {
    const where = req.session.user ? { userId: req.session.user.id } : {};
    const collections = await Collection.findAll({
      where,
      include: [{ model: Test, as: "Tests" }],
      order: [["createdAt", "DESC"]],
    });
    res.json(collections);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

//route that creates a collection
router.post("/collection", async (req, res) => {
  try {
    const { name, visibility, userId } = req.body;
    const collection = await Collection.create({ name, visibility, userId });
    res.json({ collection });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

//route that updates a collection (name/visibility come in as query params)
router.put("/collection/:id", async (req, res) => {
  try {
    const { name, visibility } = req.query;
    const collection = await Collection.findByPk(req.params.id);
    if (!collection)
      return res.status(404).json({ message: "Collection not found" });
    await collection.update({
      ...(name !== undefined && { name }),
      ...(visibility !== undefined && { visibility }),
    });
    res.json({ message: "Collection updated", collection });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

//route that deletes a collection
router.delete("/collection/:id", async (req, res) => {
  try {
    const collection = await Collection.findByPk(req.params.id);
    if (!collection)
      return res.status(404).json({ message: "Collection not found" });
    await collection.destroy();
    res.json({ message: "Collection deleted" });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

module.exports = router;
