const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const isAuth = require("../middleware/isAuth");
const adminControllers = require("../controllers/admin");

// @route  Post api/admin
// @desc   Create Category
// @access Private
router.post(
  "/category",
  [
    check("title", "Title is required")
      .trim()
      .not()
      .isEmpty()
      .isString()
      .withMessage("Title should have been string")
      .escape()
      .isLength({ min: 6, max: 30 })
      .withMessage(
        "Title length should have been at least 6 to 30 character long"
      ),
    check("route", "Route is required")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Route is [a-z] character allowed only")
      .escape()
      .isLength({ min: 6, max: 55 })
      .withMessage(
        "Route length should have been at least 6 to 55 character long"
      ),
    check("description", "Description is required")
      .trim()
      .not()
      .isEmpty()
      .isString()
      .withMessage("Description should have been string")
      .escape()
      .isLength({ min: 10, max: 255 })
      .withMessage(
        "Title length should have been at least 10 to 255 character long"
      )
  ],
  isAuth,
  adminControllers.postCareateCat
);

router.put("/add-feature-post", isAuth, adminControllers.addFeaturePost);

// Remove Feature Post
router.delete(
  "/remove-feature-post/:postId",
  isAuth,
  adminControllers.removeFeaturePost
);

module.exports = router;
