const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res
      .status(401)
      .json({ msg: "No token, User authorization failed!" });
  }
  let decoded;
  try {
    decoded = jwt.verify(token, config.get("jwtSecret"));
  } catch (err) {
    return res.status(401).json({ msg: "Token is not Valid" });
  }

  if (!decoded) {
    return res
      .status(401)
      .json({ msg: "Token is not valid, User authorization failed!" });
  }
  try {
    const user = await User.findById(decoded.user.id);
    if (!user) {
      return res.status(300).json({ msg: "Something went wrong!" });
    }
    if (!user.isActive) {
      req.inActiveUser = decoded.user;
      next();
    }
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Something went wrong! we will fix it soon" });
  }
};
