const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const Image = require("../models/Image");
const Post = require("../models/Post");
const User = require("../models/User");
const Category = require("../models/Category");
const Notification = require("../models/Notification");

exports.createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    return res.status(422).json(error);
  }

  try {
    const { title, content, catId, tags } = req.body;
    const file = req.file;

    const filename = file.filename;
    const fileId = file._id;
    const path = file.bucketName;
    const userId = req.user.id;

    const image = new Image({
      filename,
      userId,
      fileId,
      path
    });

    await image.save();
    if (!image) {
      return res.status(500).json({ message: "Something Went Wrong!" });
    }

    const thumbnail = image.filename;
    const isCatMatch = await Category.findById(catId);
    if (!isCatMatch) {
      return res.status(400).json({ message: "Category is not valid" });
    }

    const post = new Post({
      title,
      content,
      catId,
      tags,
      thumbnail,
      author: req.user.id
    });
    await post.save();

    res.status(201).json({ post, message: "Post is successfully created!" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getPosts = async (req, res) => {
  const perPage = +req.query.perpage;
  const currentPage = +req.query.page;

  try {
    let posts;
    const totalPosts = await Post.find().countDocuments();
    if (currentPage) {
      if (perPage) {
        posts = await Post.find()
          .skip((currentPage - 1) * perPage)
          .limit(perPage)
          .sort({ date: -1 })
          .populate({ path: "author", select: "username" })
          .exec();
      } else {
        posts = await Post.find()
          .skip((currentPage - 1) * 10)
          .limit(10)
          .sort({ date: -1 })
          .populate({ path: "author", select: "username" })
          .exec();
      }
    } else {
      posts = await Post.find()
        .sort({ date: -1 })
        .populate({ path: "author", select: "username" })
        .exec();
    }
    // const posts = await Post.find()
    //   .skip((currentPage - 1) * perPage)
    //   .limit(perPage);
    res.status(200).json({
      posts,
      currentPage,
      totalPosts,
      perPage,
      message: "Post Fetch Successfulley"
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getFeaturePosts = async (req, res) => {
  try {
    const featurePosts = await Post.find({ feature: true })
      .limit(10)
      .select(
        "-comments -likes -content -feature -author -catId -totalComments -tags"
      )
      .sort({ date: -1 });
    // if (featurePosts.length <= 0) {
    //   return res.status(404).json({ message: "Feature Posts is not found" });
    // }
    res
      .status(200)
      .json({ message: "Feature Posts Fetch Success", featurePosts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "ServerError" });
  }
};

exports.getPostById = async (req, res) => {
  const postId = req.params.postId;
  if (!postId) {
    return res.status(404).json({ message: "Post not Found" });
  }
  try {
    const post = await Post.findById(postId)
      .populate({ path: "author", select: "username avatar" })
      .exec();
    if (!post) {
      return res.status(404).json({ message: "Post not Found" });
    }

    res.status(200).json(post);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Post not Found" });
    }
    res.status(500).json({ message: "Server Error" });
  }
};
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
/// Search post
exports.getSearchPost = async (req, res) => {
  const perPage = 10;
  const currentPage = +req.query.page || 1;
  const str = req.query.q;
  // const regex = new RegExp(escapeRegex(req.query.q), "gi");
  // const posts = await Post.find({ title: regex }).select("title");
  const posts = await Post.find(
    {
      $text: { $search: str, $caseSensitive: false }
    },
    { score: { $meta: "textScore" } }
  )
    .sort({ score: { $meta: "textScore" } })
    .select("-comments")
    .skip((currentPage - 1) * perPage)
    .limit(perPage)
    .populate({ path: "author", select: "username" })
    .exec();
  const totalPost = await Post.find(
    {
      $text: { $search: str, $caseSensitive: false }
    },
    { score: { $meta: "textScore" } }
  )
    .select("title")
    .countDocuments();
  res.status(200).json({
    message: "Search Success",
    posts: posts,
    currentPage: currentPage,
    totalPost
  });
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    console.log(err);
  }
};

exports.postLike = async (req, res) => {
  const postId = req.body.postId;
  const userId = req.user.id;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ message: "The post your going to like not found" });
    }

    const existLike = post.likes.find(
      i => i.userId.toString() === userId.toString()
    );

    const to = post.author;
    const from = userId;

    if (existLike) {
      const newLikes = post.likes.filter(
        i => i.userId.toString() !== userId.toString()
      );
      post.likes = newLikes;
      await post.save();

      ///Delete Notification
      let notifications = await Notification.find();
      const myNotif = notifications.find(i => {
        return (
          i.from.toString() === from.toString() &&
          i.title === "like" &&
          i.postId.toString() === postId.toString()
        );
      });
      if (myNotif) {
        await Notification.deleteOne({ _id: myNotif._id });
      }

      return res
        .status(201)
        .json({ message: "Post has beeb unliked", likes: post.likes });
    }
    if (!existLike) {
      post.likes.unshift({ userId: userId });
      await post.save();
      ///Add Notification
      if (to.toString() !== from.toString()) {
        const notification = new Notification({
          msg: "Like your post",
          postId: post._id,
          to,
          from,
          title: "like"
        });
        await notification.save();
      } //end of notification
      return res
        .status(201)
        .json({ message: "Post has beeb liked", likes: post.likes });
    }
  } catch (err) {
    console.log(err);
    if (err.kind === "ObjectId") {
      return res
        .status(404)
        .json({ message: "The post your going to like not found" });
    }
    res.status(500).json({ message: "Server Error" });
  }
};

/// add Post Comment

exports.postAddComment = async (req, res) => {
  const { postId, text } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    return res.status(422).json(error);
  }
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ message: "The Post is not found that you want to Comment" });
    }
    const user = await User.findById(req.user.id).select("-password");
    const newComment = {
      userId: user._id,
      avatar: user.avatar,
      username: user.username,
      text: text
    };

    post.comments.unshift({ comment: { ...newComment } });

    let tCom = 0;
    post.comments.map(i => {
      tCom += 1;
      i.reply.map(j => (tCom += 1));
    });
    post.totalComments = tCom;
    await post.save();

    // add notification
    const myCom = post.comments.find(
      i => i.comment.userId.toString() === user._id.toString()
    );
    if (myCom && post.author.toString() !== req.user.id.toString()) {
      const notification = new Notification({
        title: "comment",
        msg: "Comment on your post.",
        postId: post._id,
        comId: myCom._id,
        from: req.user.id,
        to: post.author
      });

      await notification.save();
    }

    res.status(201).json({
      message: "Comment Successfully Added",
      comments: post.comments,
      totalComments: post.totalComments
    });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return status(404).json({
        message: "The Post is not found that you want to add comment"
      });
    }
    res.status(500).json({ message: "Server Error" });
  }
};

/// Edit Comment
exports.editComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    return res.status(422).json(error);
  }
  const text = req.body.text;
  const { postId, comId } = req.params;
  if (!postId || !comId) {
    return res
      .status(404)
      .json({ message: "The Comment you want to edit not found" });
  }
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ message: "The Comment you want to edit not found" });
    }
    const com = post.comments.find(i => i._id.toString() === comId);
    if (!com) {
      return res
        .status(404)
        .json({ message: "The Comment you want to edit not found" });
    }
    console.log("i am work");
    if (req.user.id.toString() !== com.comment.userId.toString()) {
      return res
        .status(401)
        .json({ message: "You do not have access to edit this comment" });
    }
    const comIndex = post.comments.findIndex(
      i => i._id.toString() === comId.toString()
    );
    // const updatedComment = (com.comment.text = text);
    post.comments[comIndex].comment.text = text;
    await post.save();
    res.status(201).json({
      message: "Comment updated successfully",
      comment: post.comments[comIndex].comment
    });
  } catch (err) {
    console.log(err);
    if (err.kind === "ObjectId") {
      return res
        .status(404)
        .json({ message: "The Comment you want to edit not found" });
    }
    res.status(500).json({ message: "Server Error" });
  }
};

/// Delete Comment
exports.deleteComment = async (req, res) => {
  const postId = req.params.postId;
  const comId = req.params.comId;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ message: "The Comment you want to delete not found" });
    }
    const com = post.comments.find(i => i._id.toString() === comId);
    if (!com) {
      return res
        .status(404)
        .json({ message: "The Comment you want to delete not found" });
    }
    if (com.comment.userId.toString() !== req.user.id.toString()) {
      return res
        .status(401)
        .json({ message: "You do not have access to delete this comment" });
    }
    post.comments = post.comments.filter(i => i._id.toString() !== comId);
    let tCom = 0;
    post.comments.map(i => {
      tCom += 1;
      i.reply.map(j => (tCom += 1));
    });
    post.totalComments = tCom;
    await post.save();

    /// Remove Notification
    await Notification.deleteMany({ comId: comId });
    res.status(200).json({
      comments: post.comments,
      totalComments: post.totalComments,
      message: "Comment deleted successfully"
    }); /// end of remove notification
  } catch (err) {
    console.log(err);
    if (err.kind === "ObjectId") {
      return res
        .status(404)
        .json({ message: "The comment you want to delete not found" });
    }
    res.status(500).json({ message: "Server Error" });
  }
};

/// Like Comment
exports.likeComment = async (req, res) => {
  const { postId, comId } = req.params;
  if (!postId && !comId) {
    return res
      .status(404)
      .json({ message: "The comment you want to like is not found" });
  }

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ message: "The comment you want to like is not found" });
    }

    const com = post.comments.find(i => i._id.toString() === comId);

    if (!com) {
      return res
        .status(404)
        .json({ message: "The comment you want to like is not found" });
    }
    const comIndex = post.comments.findIndex(i => i._id.toString() === comId);

    const existLike = com.comment.likes.find(
      i => i.userId.toString() === req.user.id.toString()
    );

    if (existLike) {
      const filterLikes = com.comment.likes.filter(
        i => i.userId.toString() !== req.user.id.toString()
      );
      post.comments[comIndex].comment.likes = filterLikes;
      await post.save();

      /// Remove Notification
      const notification = await Notification.findOne({
        title: "like",
        postId,
        comId,
        from: req.user.id
      });
      if (notification) {
        await Notification.deleteOne({ _id: notification._id });
      } ///End of Remove Notification

      res.status(201).json({
        message: "Comment like has been Removed",
        likes: post.comments[comIndex].comment.likes
      });
    } else {
      post.comments[comIndex].comment.likes.unshift({ userId: req.user.id });
      await post.save();

      /// Add Notification
      if (com.comment.userId.toString() !== req.user.id) {
        const notification = new Notification({
          title: "like",
          postId,
          comId,
          msg: "Like your comment",
          to: com.comment.userId,
          from: req.user.id
        });
        await notification.save();
      }

      res.status(201).json({
        message: "Comment Like has been Added",
        likes: post.comments[comIndex].comment.likes
      });
    }
  } catch (err) {
    console.log(err);
    if (err.kind === "ObjectId") {
      return res
        .status(404)
        .json({ message: "The comment you want to like is not found" });
    }
    res.status(500).json({ message: "Server Error" });
  }
};

/// add comment reply
exports.postAddCommentReplay = async (req, res) => {
  const { postId, replayText, comId } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    return res.status(422).json(error);
  }
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "The Post Comment is not found that you want to Replay"
      });
    }
    const myComment = post.comments.find(i => i._id.toString() === comId);
    if (!myComment) {
      return res.status(404).json({
        message: "The Post Comment is not found that you want to Replay"
      });
    }
    const myComIndex = post.comments.findIndex(i => i._id.toString() === comId);
    const user = await User.findById(req.user.id).select("-password");
    const newCommentReplay = {
      userId: user._id,
      avatar: user.avatar,
      username: user.username,
      text: replayText,
      _id: new mongoose.Types.ObjectId()
    };

    post.comments[myComIndex].reply.push(newCommentReplay);
    post.totalComments = post.totalComments + 1;
    await post.save();

    /// Add Notification
    if (
      post.comments[myComIndex].comment.userId.toString() !==
      newCommentReplay.userId.toString()
    ) {
      const notification = new Notification({
        title: "reply",
        msg: "Reply your comment",
        to: post.comments[myComIndex].comment.userId,
        from: newCommentReplay.userId,
        postId: post._id,
        comId: comId,
        repId: newCommentReplay._id
      });

      await notification.save();
    }

    if (post.author.toString() !== newCommentReplay.userId.toString()) {
      const notification = new Notification({
        title: "reply",
        msg: "Reply your post comment",
        to: post.author,
        from: newCommentReplay.userId,
        postId: post._id,
        comId: comId,
        repId: newCommentReplay._id
      });

      await notification.save();
    }

    res.status(201).json({
      message: "Replay added Successfully",
      replies: post.comments[myComIndex].reply,
      totalComments: post.totalComments
    });
  } catch (err) {
    console.log(err);
    if (err.kind === "ObjectId") {
      return status(404).json({
        message: "The Post is not found that you want to add comment"
      });
    }
    res.status(500).json({ message: "Server Error" });
  }
};

/// Like Comment Reply
exports.likeComReply = async (req, res) => {
  const { postId, comId, repId } = req.params;
  if (!postId && !comId && !repId) {
    return res
      .status(404)
      .json({ message: "The comment reply you want to like is not found" });
  }

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ message: "The comment reply you want to like is not found" });
    }

    const com = post.comments.find(i => i._id.toString() === comId);

    if (!com) {
      return res
        .status(404)
        .json({ message: "The comment reply you want to like is not found" });
    }
    const comIndex = post.comments.findIndex(i => i._id.toString() === comId);

    const rep = com.reply.find(i => i => i._id.toString() === repId);
    if (!rep) {
      return res
        .status(404)
        .json({ message: "The comment reply you want to like is not found" });
    }

    const repIndex = com.reply.findIndex(i => i => i._id.toString() === repId);

    const existLike = com.reply[repIndex].likes.find(
      i => i.userId.toString() === req.user.id.toString()
    );

    if (existLike) {
      const filterLikes = com.reply[repIndex].likes.filter(
        i => i.userId.toString() !== req.user.id.toString()
      );
      post.comments[comIndex].reply[repIndex].likes = filterLikes;
      await post.save();

      /// Remove Notification
      await Notification.deleteOne({ repId, title: "like", from: req.user.id });

      res.status(201).json({
        message: "Comment reply like has been Removed",
        likes: post.comments[comIndex].reply[repIndex].likes
      });
    } else {
      post.comments[comIndex].reply[repIndex].likes.unshift({
        userId: req.user.id
      });
      await post.save();

      /// Add Notification
      console.log(req.user.id.toString() !== rep.userId.toString());
      if (req.user.id.toString() !== rep.userId.toString()) {
        const notification = new Notification({
          title: "like",
          to: rep.userId,
          from: req.user.id,
          msg: "Like your reply",
          repId,
          comId,
          postId
        });
        await notification.save();
      }

      res.status(201).json({
        message: "Comment reply Like has been Added",
        likes: post.comments[comIndex].reply[repIndex].likes
      });
    }
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res
        .status(404)
        .json({ message: "The comment reply you want to like is not found" });
    }
    res.status(500).json({ message: "Server Error" });
  }
};

/// edit reply
exports.putCommentReply = async (req, res) => {
  const { postId, comId, repId } = req.params;
  const text = req.body.text;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    return res.status(422).json(error);
  }

  if (!postId || !comId || !repId) {
    return res
      .status(404)
      .json({ message: "The Reply You want to edit is not found" });
  }

  try {
    const post = await Post.findById(postId);
    if (!postId) {
      return res
        .status(404)
        .json({ message: "The Reply You want to edit is not found" });
    }

    const com = post.comments.find(i => i._id.toString() === comId);
    if (!com) {
      return res
        .status(404)
        .json({ message: "The Reply you want to edit is not found!" });
    }
    const rep = com.reply.find(i => i._id.toString() === repId);
    if (!repId) {
      return res
        .status(404)
        .json({ message: "The Reply you want to edit is not found!" });
    }

    if (rep.userId.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "You do not have access to edit this reply" });
    }
    const comIndex = post.comments.findIndex(i => i._id.toString() === comId);
    const repIndex = com.reply.findIndex(i => i._id.toString() === repId);
    rep.text = text;
    post.comments[comIndex].reply[repIndex] = rep;
    await post.save();
    res.json({
      message: "Reply is edited successfully",
      reply: post.comments[comIndex].reply
    });
  } catch (err) {
    console.log(err);
    if (err.kind === "ObjectId") {
      return res
        .status(404)
        .json({ message: "The Reply you want to edit is not found" });
    }
    res.status(500).json({ message: "Server Error" });
  }
};

/// delete reply
exports.deleteCommentReply = async (req, res) => {
  const { postId, comId, repId } = req.params;
  if (!postId || !comId || !repId) {
    return res
      .status(404)
      .json({ message: "The Reply you want to delete not found!" });
  }

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ message: "The Reply you want to delete not found!" });
    }

    const com = post.comments.find(i => i._id.toString() === comId);
    if (!com) {
      return res
        .status(404)
        .json({ message: "The Reply you want to delete not found!" });
    }

    const comIndex = post.comments.findIndex(i => i._id.toString() === comId);

    const rep = com.reply.find(i => i._id.toString() === repId);
    if (!rep) {
      return res
        .status(404)
        .json({ message: "The Reply you want to delete not found!" });
    }
    if (rep.userId.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "You do not have access to delete reply" });
    }

    // const repIndex = com.reply.findIndex( i => i._id.toString() === repId);
    const totalReply = post.comments[comIndex].reply.filter(
      i => i._id.toString() !== repId
    );
    post.comments[comIndex].reply = totalReply;
    let tCom = 0;
    post.comments.map(i => {
      tCom += 1;
      i.reply.map(j => (tCom += 1));
    });
    post.totalComments = tCom;
    await post.save();

    /// Remove Notification
    await Notification.deleteMany({ repId: repId });
    res.status(203).json({
      message: "Reply is deleted successfully",
      reply: post.comments[comIndex].reply,
      totalComments: post.totalComments
    });
  } catch (err) {
    console.log(err);
    if (err.kind === "ObjectId") {
      return res
        .status(404)
        .json({ message: "The Reply you want to delete not found!" });
    }
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getCatPosts = async (req, res) => {
  const perPage = +req.query.perpage;
  const currentPage = +req.query.page;
  const catRoute = req.params.catRoute;

  try {
    const categori = await Category.findOne({ route: catRoute });
    if (!categori._id) {
      return res.status(404).json({ message: "Categori does not exist!" });
    }
    const catId = categori._id;
    let posts;
    const totalPosts = await Post.find({ catId: catId }).countDocuments();
    if (currentPage) {
      if (perPage) {
        posts = await Post.find({ catId: catId })
          .skip((currentPage - 1) * perPage)
          .limit(perPage)
          .sort({ date: -1 })
          .populate({ path: "author", select: "username" })
          .exec();
      } else {
        posts = await Post.find({ catId: catId })
          .skip((currentPage - 1) * 10)
          .limit(10)
          .sort({ date: -1 })
          .populate({ path: "author", select: "username" })
          .exec();
      }
    } else {
      posts = await Post.find({ catId: catId })
        .sort({ date: -1 })
        .populate({ path: "author", select: "username" })
        .exec();
    }
    // const posts = await Post.find()
    //   .skip((currentPage - 1) * perPage)
    //   .limit(perPage);
    res.status(200).json({
      posts,
      currentPage,
      totalPosts,
      perPage,
      message: "Post Fetch Successfulley"
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getUserPosts = async (req, res) => {
  const perPage = +req.query.perpage;
  const currentPage = +req.query.page;
  const userId = req.params.userId;
  if (!userId) {
    return res.status(401).json({ message: "User Id is missing" });
  }

  try {
    let posts;
    const totalPosts = await Post.find({ author: userId }).countDocuments();
    if (totalPosts <= 0) {
      return res.status(200).json({ posts: [] });
    }
    if (currentPage) {
      if (perPage) {
        posts = await Post.find({ author: userId })
          .skip((currentPage - 1) * perPage)
          .limit(perPage)
          .sort({ date: -1 })
          .populate({ path: "author", select: "username" })
          .exec();
      } else {
        posts = await Post.find({ author: userId })
          .skip((currentPage - 1) * 10)
          .limit(10)
          .sort({ date: -1 })
          .populate({ path: "author", select: "username" })
          .exec();
      }
    } else {
      posts = await Post.find({ author: userId })
        .sort({ date: -1 })
        .populate({ path: "author", select: "username" })
        .exec();
    }
    // const posts = await Post.find()
    //   .skip((currentPage - 1) * perPage)
    //   .limit(perPage);
    res.status(200).json({
      posts,
      currentPage,
      totalPosts,
      perPage,
      message: "Post Fetch Successfulley"
    });
  } catch (err) {
    console.log(err);
    if (err.kind === "ObjectId") {
      return res.status(401).json({ message: "User is not valid" });
    }
    res.status(500).json({ message: "Server Error" });
  }
};
