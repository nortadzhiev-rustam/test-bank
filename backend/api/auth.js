const express = require('express');
const router = express.Router();

router.get('/isAuth', async (req, res) => {

 const {user, isAuth} = await req.session;
console.log(user);
if (user) {
  res.json({
    message: `Welcome Back! ${user.firstName}`,
    user: user,
    isAuth: isAuth
  });
} else {
    res.status(401).json({
        message: '🙅‍♀️ - Unauthorized',
    });
}
});

module.exports = router;
    