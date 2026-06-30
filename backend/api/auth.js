const express = require("express");
const router = express.Router();

router.get("/isAuth", (req, res) => {
  const { user, isAuth } = req.session;
  if (user) {
    // Older sessions stored a raw Sequelize instance, so the real fields live
    // under `dataValues`; newer sessions store a plain object. Handle both so
    // the client always receives a flat user (with `role` at the top level).
    const plainUser = user.dataValues || user;
    res.json({
      message: `Welcome Back! ${plainUser.firstName}`,
      user: { ...plainUser, password: undefined },
      isAuth: isAuth,
    });
  } else {
    res.status(401).json({
      message: "🙅‍♀️ - Unauthorized",
    });
  }
});

module.exports = router;
