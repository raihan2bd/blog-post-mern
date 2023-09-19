const express = require("express");
const { check } = require("express-validator");

const router = express.Router();
const isAuth = require("../middleware/isAuth");
const profileController = require("../controllers/profile");

// @route  Post api/profile/me
// @desc   Register User
// @access Private
router.get("/me", isAuth, profileController.getProfile);
router.put(
  "/edit-details",
  isAuth,
  [
    check("status", "Status is required")
      .trim()
      .not()
      .isEmpty()
      .isLength({ min: 5, max: 55 })
      .withMessage("Status should have been 5 to 55 character long"),
    check("about", "About is required")
      .trim()
      .not()
      .isEmpty()
      .isLength({ min: 25, max: 555 })
      .withMessage("About should have been 25 to 555 character long"),
    check("location", "Location is required")
      .trim()
      .isLength({ max: 255 })
      .withMessage("Location should have been 5 to 255 character long"),
    check("company", "Company is required")
      .trim()
      .isLength({ max: 55 })
      .withMessage("Company should have been 5 to 55 character long"),
    check("website", "Website is required")
      .trim()
      .isLength({ max: 255 })
      .withMessage("Website should have been 5 to 255 character long"),
    check("facebook", "facebook is required")
      .trim()
      .isLength({ max: 255 })
      .withMessage("facebook should have been 5 to 255 character long"),
    check("twitter", "twitter is required")
      .trim()
      .isLength({ max: 255 })
      .withMessage("twitter should have been 5 to 255 character long"),
    check("instagram", "instagram is required")
      .trim()
      .isLength({ max: 255 })
      .withMessage("instagram should have been 5 to 255 character long")
  ],
  profileController.putEditDetails
);

module.exports = router;
