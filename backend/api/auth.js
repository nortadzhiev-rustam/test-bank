const express = require("express");
const router = express.Router();

router.get("/isAuth", (req, res) => {
  const { user, isAuth } = req.session;
  console.log(user);
  if (user) {
    res.json({
      message: `Welcome Back! ${user.firstName}`,
      user: { ...user, password: undefined },
      isAuth: isAuth,
    });
  } else {
    res.status(401).json({
      message: "🙅‍♀️ - Unauthorized",
    });
  }
});

module.exports = router;
