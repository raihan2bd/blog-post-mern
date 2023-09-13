const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../models/User");

exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    return res.status(422).json(error);
  }
  const { fullname, username, email, password } = req.body;
  try {
    // Check Username is already exist or not
    // Check Email is already exist or not
    let user = await User.findOne({ username: username.toLowerCase() });
    if (user) {
      return res.status(400).json({ message: "Username is already taken." });
    }
    user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "E-mail is already exist try with another one." });
    }

    // Get user gravatar
    const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm"
    });
    user = new User({
      fullname,
      username: username.toLowerCase(),
      email,
      password,
      avatar
    });
    // Hash the password
    const hashpassword = await bcrypt.hash(password, 12);
    user.password = hashpassword;
    await user.save();
    res.status(201).json({ message: "Signup success", userId: user._id });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    return res.status(422).json(error);
  }

  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      {
        user: {
          id: user._id,
          username: user.username,
          avatar: user.avatar,
          role: user.userType
        }
      },
      config.get("jwtSecret"),
      {
        expiresIn: "1h"
      }
    );
    res.status(200).json({ message: "Login Success!", token: token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Something Went Wrong We will fix is soon!");
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password -userType -isActive"
    );
    if (!user) {
      return res.status(404).json({ message: "User Does not found!" });
    }
    res.status(200).json({ user });
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "User Does not found!" });
    }
    return res.status(500).send("Server Error");
  }
};

exports.getInActiveUser = async (req, res) => {
  try {
    const user = await User.findById(req.inActiveUser.id).select(
      "-password -userType -isActive"
    );
    if (!user) {
      return res.status(404).json({ message: "User Does not found!" });
    }
    res.status(200).json({ user });
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "User Does not found!" });
    }
    return res.status(500).send("Server Error");
  }
};
