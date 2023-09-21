const express = require('express');
const router = express.Router();
const AddUser = require('../models/createuser');//models to create a user
const bodyparser = require('body-parser');
const session = require("express-session");
const cookie = require("cookie-parser");
const md5 = require('md5');
const User = require('../Controllers/User');
const LoginValidator = require('../middleware/Validators');
const oneDay = 1000 * 60 * 60 * 24;
router.use(session({
  secret: 'ssshhhhh', saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false
}
));
router.use(cookie());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(bodyparser.urlencoded({ extended: false }));
router.use(bodyparser.json());

router.post('/userlogin', LoginValidator.LoginValidator, User.UserLogin);



module.exports = router;