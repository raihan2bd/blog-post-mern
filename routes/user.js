const express = require("express");
const { check, body } = require("express-validator");
const router = express.Router();

const User = require("../models/User");
const userControllers = require("../controllers/user");
const isAuth = require("../middleware/isAuth");
const isActive = require("../middleware/isActive");

// @route  Post api/users
// @desc   Register User
// @access Public
router.post(
  "/signup",
  [
    check("fullname", "Full name is required!")
      .trim()
      .not()
      .isEmpty()
      .isLength({ min: 5, max: 30 })
      .withMessage("Fullname should have been at least 5 to 30 character logn!")
      .escape(),
    check(
      "username",
      "Username should have been at least 5 to 25 character logn!"
    )
      .trim()
      .isLength({ min: 5, max: 25 })
      .isAlphanumeric()
      .withMessage(
        "Enter a uername that contains only character (Aa-Zz to 0-9)"
      )
      .escape(),
    check("email", "Please enter a valid Email")
      .trim()
      .not()
      .isEmpty()
      .isEmail()
      .normalizeEmail(),
    check(
      "password",
      "Password should have been at least 5 to 25 character logn!"
    )
      .trim()
      .isLength({ min: 6, max: 25 })
      .isString()
  ],
  userControllers.signup
);

// @route  Post api/users
// @desc   Login User
// @access Public
router.post(
  "/login",
  [
    body("email", "E-mail is Required")
      .trim()
      .not()
      .isEmpty()
      .normalizeEmail(),
    body("password", "password is Required")
      .trim()
      .not()
      .isEmpty()
  ],
  userControllers.login
);

// @route  Get api/users
// @desc   Fetch Single User
// @access Private
router.get("/me", isAuth, userControllers.getUser);

// @route  Get api/users/verify-email
// @desc   Verify User Email
// @access Private
router.get("/inactive", isActive, userControllers.getInActiveUser);
module.exports = router;
