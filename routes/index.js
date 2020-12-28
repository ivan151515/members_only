var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs")
const post = require('../models/post');
const User = require("../models/user")
/* GET home page. */
const { body,validationResult } = require("express-validator");

router.get('/', function(req, res, next) {
  res.redirect("/register")
});

router.get("/register", function(req,res,next) {
  res.render("register_form", {title: "Members Only"})
})

router.post("/register", [
  body('first_name', 'First Name required').trim().isLength({ min: 1 }).escape(),
  body('second_name', 'Second Name required').trim().isLength({ min: 1 }).escape(),
  body('email', 'Email required').trim().isLength({ min: 1 }).escape(),
  body("email","Email Addres must be valid").normalizeEmail().isEmail(),
  body('password', 'Password required').trim().isLength({ min: 4 }).escape(),
  body('confirm_password', "Passwords must match").exists().custom((value, { req }) => value === req.body.password),

  (req, res, next) => {

  const errors = validationResult(req);

  
  if (!errors.isEmpty()) {
    // There are errors. Render the form again with sanitized values/error messages.
    res.render('register_form', { title: 'Register', errors: errors.array()});
    return;
  }
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    // if err, do something
    // otherwise, store hashedPassword in DB
    const user = new User({
      email: req.body.email,
      first_name: req.body.first_name,
      second_name: req.body.second_name,
      password: hashedPassword,
      isAdmin: false,
      isMember: false
  }).save(err => {
    if (err) { 
      return next(err);
    };
    res.redirect("/posts");
  });
  });
}]);

router.get("/login", function(req, res, next) {
  res.render("login_form")
})

router.get("/posts", function(req,res,next) {
  res.send("Posts not set up yet")
})
module.exports = router;
