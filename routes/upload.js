const express = require("express");
const multer = require("multer");
const router = express.Router();
const isAuth = require("../middleware/isAuth");
const uploadControllers = require("../controllers/upload");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/thumbnails");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
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
  "/thumbnail",
  isAuth,
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("thumbnail"),
  uploadControllers.postThumbnail
);

module.exports = router;
