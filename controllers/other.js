const { validationResult } = require("express-validator");
const User = require("../models/User");
const Contact = require("../models/Contact");

exports.postContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    return res.status(422).json(error);
  }
  let { name, email, title, message } = req.body;
  try {
    if (req.user) {
      const userId = req.user.id;

      const user = await User.findById(userId);

      name = user.username;
      email = user.email;
    } else {
      if (!name && !email) {
        return res.status(422).json({ message: "Name and Email is required" });
      }
    }
    const contact = new Contact({
      name,
      email,
      title,
      message
    });
    await contact.save();
    res.status(201).json({
      message: "Your request is send successfylly. We will contact you soon."
    });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(401).json({ message: "Failed to authorize" });
    }
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
