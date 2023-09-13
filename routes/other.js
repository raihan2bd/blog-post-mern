const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth");
const { check } = require("express-validator");
const otherController = require("../controllers/other");

router.post(
  "/user/contact-us",
  isAuth,
  [
    check("title", "Title is required")
      .trim()
      .not()
      .isEmpty()
      .isLength({ min: 8, max: 255 })
      .withMessage("Title should have been 8 to 255 character long"),
    check("message", "Message is required")
      .trim()
      .not()
      .isEmpty()
      .isLength({ min: 20, max: 555 })
      .withMessage("Message should have been 20 to 555 character long")
  ],
  otherController.postContact
);
router.post(
  "/contact-us",
  [
    check("title", "Title is required")
      .trim()
      .not()
      .isEmpty()
      .isLength({ min: 8, max: 255 })
      .withMessage("Title should have been 8 to 255 character long"),
    check("message", "Message is required")
      .trim()
      .not()
      .isEmpty()
      .isLength({ min: 20, max: 555 })
      .withMessage("Message should have been 20 to 555 character long"),
    check("name", "Name is required")
      .trim()
      .not()
      .isEmpty()
      .isLength({ min: 3, max: 55 })
      .withMessage("Name should have been 3 to 55 character long"),
    check("email", "Enter a valid Email")
      .not()
      .isEmpty()
      .isEmail()
      .normalizeEmail()
  ],
  otherController.postContact
);

module.exports = router;
