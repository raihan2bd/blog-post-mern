const express = require("express");
const multer = require("multer");
const { body } = require("express-validator");

const serviceController = require("../controllers/service");
const isAuth = require("../middleware/isAuth");
const router = express.Router();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images");
  },
  filename: (req, file, cb) => {
    let filename = file.originalname;
    let re = /\s/g;
    if (re.test(filename)) {
      filename = filename.replace(re, "-");
    }
    cb(null, Date.now() + "-" + filename);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

router.post(
  "/",
  isAuth,
  multer({ storage: fileStorage, fileFilter: fileFilter }).array("images", 3),
  [
    (body("title", "Title is required")
      .trim()
      .not()
      .isEmpty()
      .isLength({ min: 10, max: 255 })
      .withMessage("Title Should have been 10 to 255 character long"),
    body("description", "Description is required")
      .trim()
      .not()
      .isEmpty()
      .isLength({ min: 25, max: 555 })
      .withMessage("Description Should have been 10 to 255 character long"))
  ],
  serviceController.addService
);

router.get("/", serviceController.getServices);
router.get("/:serviceId", serviceController.getService);

module.exports = router;
