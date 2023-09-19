const jwt = require("jsonwebtoken");
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
    decoded = jwt.verify(token, process.env.JWT_SECRET);
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
      return res.status(300).json({ msg: "User Authorization Failed." });
    }
    if (!user.isActive) {
      req.inActiveUser = decoded.user;
      return res.status(300).json({ msg: "User email is not active" });
    }
    if (user.userType !== "admin") {
      return res.status(401).json({ msg: "User Access Denaied" });
    }
    req.user = decoded.user;
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Something went wrong! we will fix it soon" });
  }
  next();
};
