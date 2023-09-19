const express = require("express");

const notificationController = require("../controllers/notification");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get("/", isAuth, notificationController.getNotification);

router.get("/count", isAuth, notificationController.getTotalNotification);

module.exports = router;
