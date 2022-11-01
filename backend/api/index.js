const express = require("express");
const registerApi = require("./register");
const loginApi = require("./login");
const paymentApi = require("./payment");
const department = require("./department");
const test = require("./test");
const logout = require("./logout");
const isAuth =require("./auth");
const image = require('./imageUpload')
const users = require("./users");
const router = express.Router();

router.use(registerApi);
router.use(loginApi);
router.use(paymentApi);
router.use(department);
router.use(test);
router.use(logout);
router.use(isAuth);
router.use(image);
router.use(users);
module.exports = router;
