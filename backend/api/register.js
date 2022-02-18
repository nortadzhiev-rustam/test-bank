const express = require('express');
const { User } = require('../models/');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, departmentId } = req.body;

    const alreadyExistsUser = await User.findOne({ where: { email } }).catch(
      (err) => {
        console.log('Error: ', err);
      }
    );

    if (alreadyExistsUser) {
      return res
        .status(409)
        .json({ message: 'User with email already exists!' });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, 10),
      departmentId,
    });
    const jwtToken = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
    req.session.user = user;
    req.session.isAuth = true;
    res.json({message: 'User created successfully!', token: jwtToken});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
