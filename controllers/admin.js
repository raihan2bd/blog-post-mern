const { validationResult } = require("express-validator");

const User = require("../models/User");
const Category = require("../models/Category");
const Post = require("../models/Post");

exports.postCareateCat = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    return res.status(422).json(error);
  }

  try {
    const { title, description, thumbnail } = req.body;
    const route = req.body.route.toLowerCase();

    let category = await Category.findOne({ route });
    if (category) {
      return res.status(400).json({ message: "Route already exist" });
    }
    category = new Category({
      title,
      route,
      description,
      thumbnail
    });
    await category.save();
    res
      .status(201)
      .json({ message: "Category is successfully created!", category });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.addFeaturePost = async (req, res) => {
  const postId = req.body.postId;
  if (req.user.role !== "admin") {
    return res
      .status(422)
      .json({ message: "You do not have access to add featrue post" });
  }

  try {
    const post = await Post.findOne({ _id: postId });
    if (!post) {
      return res.status(404).json({
        message: "The post you want to add as a feature post is not found"
      });
    }

    post.feature = true;
    await post.save();
    res.status(201).json({ message: "Post is added as feature post", post });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.removeFeaturePost = async (req, res) => {
  const postId = req.params.postId;
  const user = req.user.role;
  if (!postId || user !== "admin") {
    return res.status(404).json({ message: "404 Request Not Vaid" });
  }

  try {
    const post = await Post.findByIdAndUpdate(
      { _id: postId },
      { feature: false }
    );
    res
      .status(201)
      .json({ message: "Post Removed From Feature", postId: postId });
  } catch (err) {
    console.log(err);
    if (err.kind === "ObjectId") {
      return res.status(404).json({
        message: "The Post You Want To Remove From Feature is not Found!!"
      });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};
