import * as actionTypes from "./actionTypes";
import axios from "axios";
import * as msgActions from "../msg/actions";

/// Fetch all posts
const fetchPostsStart = () => ({
  type: actionTypes.FETCH_POSTS_START
});

const fetchPostsSuccess = (posts, totalPosts, currentPage) => ({
  type: actionTypes.FETCH_POSTS_SUCCESS,
  posts,
  totalPosts,
  currentPage
});

const fetchPostsFailed = () => {
  return {
    type: actionTypes.FETCH_POSTS_FAILED
  };
};

export const fetchPosts = (page = 1, catRoute, userPost) => async dispatch => {
  try {
    dispatch(fetchPostsStart());
    let res;
    if (catRoute) {
      res = await axios.get(
        `/api/posts/categories/${catRoute}?page=${page}&perpage=10`
      );
    } else if (userPost) {
      res = await axios.get(
        `/api/posts/user/${userPost}?page=${page}&perpage=10`
      );
    } else {
      res = await axios.get(`/api/posts?page=${page}&perpage=10`);
    }

    dispatch(
      fetchPostsSuccess(
        res.data.posts,
        res.data.totalPosts,
        res.data.currentPage
      )
    );
  } catch (err) {
    dispatch(fetchPostsFailed());
    dispatch(msgActions.addMsg(err.response.data.message));
  }
};

/// Fetch Single Post

const fetchSinglePostStart = () => ({
  type: actionTypes.FETCH_POST_START
});

const fetchSinglePostSuccess = post => ({
  type: actionTypes.FETCH_POST_SUCCESS,
  post
});

export const fetchSinglePost = postId => async dispatch => {
  dispatch(fetchSinglePostStart());
  try {
    const res = await axios.get(`/api/posts/${postId}`);
    dispatch(fetchSinglePostSuccess(res.data));
  } catch (err) {
    msgActions.addMsg(err.response.data.message);
  }
};

/// post like
const postLikeStart = () => ({
  type: actionTypes.POST_LIKE_START
});

const postLikeSuccess = (likes, postId) => ({
  type: actionTypes.POST_LIKE_SUCCESS,
  likes,
  postId
});

// const postLikeFailed = () => ({
//   type: actionTypes.POST_LIKE_FAILED
// });

export const likePost = postId => async dispatch => {
  dispatch(postLikeStart());
  let token;
  if (localStorage.getItem("token"))
    token = JSON.parse(localStorage.getItem("token"));

  const config = {
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post("/api/posts/like", { postId }, config);
    const likes = res.data.likes;
    dispatch(postLikeSuccess(likes, postId));
  } catch (err) {
    msgActions.addMsg(err.response.data.message);
  }
};

/// Add Comment
const addCommentStart = () => ({
  type: actionTypes.ADD_COMMENT_START
});

const addCommentSuccess = (comments, totalComments) => ({
  type: actionTypes.ADD_COMMENT_SUCCESS,
  comments,
  totalComments
});

export const addComment = (postId, commentData) => async dispatch => {
  dispatch(addCommentStart());
  let token;
  if (localStorage.getItem("token"))
    token = JSON.parse(localStorage.getItem("token"));
  const config = {
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post(
      "/api/posts/comments",
      { postId, text: commentData },
      config
    );
    console.log(res.data);
    dispatch(addCommentSuccess(res.data.comments, res.data.totalComments));
  } catch (err) {
    msgActions.addMsg(err.response.data.message);
  }
};

/// edit comment
export const editCommentSuccess = (comId, comment) => ({
  type: actionTypes.EDIT_COMMENT_SUCCESS,
  comId,
  comment
});

/// Delete Comment

// const deleteCommentStart = () => ({
//   type: actionTypes.DELETE_COMMENT_START
// });

// export const deleteComment = (postId, comId) => async dispatch => {
//   let token;
//   if (localStorage.getItem("token"))
//     token = JSON.parse(localStorage.getItem("token"));
//   const config = {
//     headers: {
//       "x-auth-token": token
//     }
//   };
//   try {
//     const res = await axios.delete(
//       `/api/posts/comments/${postId}/${comId}`,
//       config
//     );
//     console.log(res.data);
//   } catch (err) {
//     console.log(err.response);
//   }
//};

export const deleteComment = (comId, totalComments) => ({
  type: actionTypes.DELETE_COMMENT_SUCCESS,
  comId,
  totalComments
});

/// Like Comment
export const likeComment = (comId, likes) => ({
  type: actionTypes.LIKE_COMMENTS,
  comId,
  likes
});

/// Add Comment Replay

const addCommentReplayStart = () => ({
  type: actionTypes.ADD_COMMENT_REPLAY_START
});

// const addCommentReplayFailded = msg => ({
//   type: actionTypes.ADD_COMMENT_REPLAY_FAILED,
//   msg: "msg"
// });

const addCommentReplaySuccess = (replies, totalComments, comId) => ({
  type: actionTypes.ADD_COMMENT_REPLAY_SUCCESS,
  replies,
  totalComments,
  comId
});

export const addCommentReplay = (
  postId,
  comId,
  replayText
) => async dispatch => {
  dispatch(addCommentReplayStart());
  let token;
  if (localStorage.getItem("token"))
    token = JSON.parse(localStorage.getItem("token"));
  const config = {
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post(
      "/api/posts/comments/reply",
      { postId, comId, replayText },
      config
    );
    dispatch(
      addCommentReplaySuccess(res.data.replies, res.data.totalComments, comId)
    );
  } catch (err) {
    msgActions.addMsg(err.response.data.message);
  }
};

export const editCommentReplySuccess = (comId, reply) => ({
  type: actionTypes.EDIT_COMMENT_REPLY_SUCCESS,
  comId,
  reply
});

const deleteReplySuccess = (comId, reply, totalComments) => ({
  type: actionTypes.DELETE_COMMENT_REPLY_SUCCESS,
  reply,
  comId,
  totalComments
});

export const deleteReply = (postId, comId, repId) => async dispatch => {
  let token;
  if (localStorage.getItem("token"))
    token = JSON.parse(localStorage.getItem("token"));
  const config = {
    headers: {
      "x-auth-token": token
    }
  };

  try {
    const res = await axios.delete(
      `/api/posts/comments/reply/${postId}/${comId}/${repId}`,
      config
    );

    console.log(res.data);
    if (res.data.reply) {
      dispatch(
        deleteReplySuccess(comId, res.data.reply, res.data.totalComments)
      );
    }
  } catch (err) {
    msgActions.addMsg(err.response.data.message);
  }
};

export const likeCommentReply = (comId, repId, likes) => ({
  type: actionTypes.LIKE_COMMENTS_REPLY,
  comId,
  repId,
  likes
});
