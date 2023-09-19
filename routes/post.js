const express = require("express");
const multer = require("multer");
const { body } = require("express-validator");
const router = express.Router();
const storage = require("../middleware/gridFsStorage");
const multerStorate = multer.memoryStorage();
const fileFilter = require("../middleware/imageUploadFilter");

const isAuth = require("../middleware/isAuth");
const postControllers = require("../controllers/post");

// const fileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/images");
//   },
//   filename: (req, file, cb) => {
//     let filename = file.originalname;
//     let re = /\s/g;
//     if (re.test(filename)) {
//       filename = filename.replace(re, "-");
//     }
//     cb(null, Date.now() + "-" + filename);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "image/jpeg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// @route  GET api/posts
// @desc   Get All Posts
// @access Public
router.get("/", postControllers.getPosts);

// @route  GET api/posts/feature
// @desc   Get All FeaturePosts
// @access Public
router.get("/feature", postControllers.getFeaturePosts);

// @route  Post api/posts/categories
// @desc   Get All Categories
// @access Public
router.get("/categories", postControllers.getCategories);

// @route  Post api/posts/categories/:catRoute
// @desc   Get All Categori posts
// @access Public
router.get("/categories/:catRoute", postControllers.getCatPosts);

// @route  Post api/posts/search
// @desc   Search post using get request
// @access Public
router.get("/search", postControllers.getSearchPost);

// @route  Post api/posts
// @desc   Create new Post
// @access Private
router.post(
  "/",
  isAuth,
  multer({ storage: multerStorate, fileFilter: fileFilter }).single("thumbnail"),
  postControllers.createPost
);

// @route  Post api/posts/like
// @desc   Like or Unlike Post
// @access Private
router.post("/like", isAuth, postControllers.postLike);

// @route  Post api/posts/Comments
// @desc   Add Post Comment
// @access Private
router.post(
  "/comments",
  isAuth,
  [
    body("text", "Comment text is required!")
      .not()
      .isEmpty()
  ],
  postControllers.postAddComment
);

// @route  Post api/posts/Comments/:postId/:comId
// @desc   Edit Comment
// @access Private
router.put(
  "/comments/:postId/:comId",
  isAuth,
  [
    body("text", "Comment text is required")
      .not()
      .isEmpty()
  ],
  postControllers.editComment
);

// @route  Post api/posts/Comments/:postId/:comId
// @desc   Delete Post
// @access Private
router.delete(
  "/comments/:postId/:comId",
  isAuth,
  postControllers.deleteComment
);

// @route  Post api/posts/Comments/like/:postId/:comId
// @desc   Like or Unlike Post Comment
// @access Private
router.put(
  "/comments/like/:postId/:comId",
  isAuth,
  postControllers.likeComment
);

// @route  Post api/posts/Comments/replay/:postId/:comId/:repId
// @desc   Delete Reply
// @access Private
router.delete(
  "/comments/reply/:postId/:comId/:repId",
  isAuth,
  postControllers.deleteCommentReply
);

// @route  Post api/posts/Comments/replay
// @desc   Add Post Comment
// @access Private
router.post(
  "/comments/reply",
  isAuth,
  [
    body("replayText", "Replay text is required!")
      .not()
      .isEmpty()
  ],
  postControllers.postAddCommentReplay
);

// @route  Post api/posts/Comments/replay/:postId/:comId/:repId
// @desc   Delete Reply
// @access Private
router.put(
  "/comments/reply/:postId/:comId/:repId",
  isAuth,
  [
    body("text", "Replay text is required!")
      .not()
      .isEmpty()
  ],
  postControllers.putCommentReply
);

// @route  Post api/posts/comments/reply/like/:postId/:comId/:repId
// @desc   Like or Unlike Post Comment Reply
// @access Private
router.put(
  "/comments/reply/like/:postId/:comId/:repId",
  isAuth,
  postControllers.likeComReply
);

// @route  GET api/posts/postId
// @desc   Get PostById
// @access Public
router.get("/:postId", postControllers.getPostById);

// @route  GET api/posts/user/:userId
// @desc   Get User posts
// @access Public
router.get("/user/:userId", postControllers.getUserPosts);

module.exports = router;
