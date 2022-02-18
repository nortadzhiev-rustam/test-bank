const express = require('express');
const router = express.Router();

router.get('/logout', (req, res) => {
  if (req.session.user) {
    req.session.destroy();
    res.clearCookie('connect.sid'); // clean up!
    return res.json({ msg: 'logging you out' });
  } else {
    return res.json({ msg: 'no user to log out!' });
  }
});

module.exports = router;
