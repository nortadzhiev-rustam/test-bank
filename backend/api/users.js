const express = require('express');
const { Department, User } = require('../models/');
const router = express.Router();
// route to get users
router.get('/users', async (req, res) => {
    try {
        const users = await User.findAll({
        include: { model: Department, as: 'department' },
        });
        res.json(users);
    } catch (error) {
        res.status(400).json({
        error: error.message,
        });
    }
    }
);
module.exports = router;