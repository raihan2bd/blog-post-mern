const User = require("../models/User");
const Profile = require("../models/Profile");
const { validationResult } = require("express-validator");

exports.getProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    let user = await User.findById(userId).select(
      "-password -userType -isActive -date"
    );
    const profile = await Profile.findOne({ userId: user._id });
    if (profile) {
      user = { ...user._doc, ...profile._doc };
    }
    console.log(user);
    res.status(200).json({ message: "Fetch Profile is success", user });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "User profile not found!" });
    }
    res.status(500).json({ message: "Server Error" });
  }
};

exports.putEditDetails = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    return res.status(422).json(error);
  }

  const {
    status,
    about,
    skills,
    location,
    website,
    facebook,
    twitter,
    instagram,
    company
  } = req.body;

  try {
    let user = await User.findById(req.user.id).select(
      "-password -userType -isActive -date"
    );
    let profile = await Profile.findOne({ userId: req.user.id });

    if (!profile) {
      profile = new Profile({
        status,
        about,
        location,
        website,
        facebook,
        twitter,
        instagram,
        company,
        userId: req.user.id
      });
    } else {
      profile.status = status;
      profile.about = about;
      profile.skills = skills;
      profile.location = location;
      profile.website = website;
      profile.company = company;
      profile.facebook = facebook;
      profile.twitter = twitter;
      profile.instagram = instagram;
    }
    await profile.save();
    user = { ...user._doc, ...profile._doc };
    res.status(201).json({ message: "Success", user });
  } catch (err) {
    console.log(err);
    if (err.kind === "ObjectId") {
      return res.status(422).json({ message: "Something went wrong" });
    }
    res.status(500).json({ message: "Server Error" });
  }
};
