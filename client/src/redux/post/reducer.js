import * as actionTypes from "./actionTypes";

const initial_state = {
  posts: [],
  loadingPosts: false,
  error: null,
  totalposts: 0,
  currentPage: 1,
  loadingLike: false,
  post: {},
  postError: null,
  loadingPost: false,
  addCommentLoading: false,
  addReplyLoadign: false
};

const updatePostLike = (post, postId, likes) => {
  let newPost = post;
  if (post._id === postId) {
    newPost.likes = likes;
  }
  return { ...newPost };
};

const updateSingleComment = (comments, comId, comment) => {
  const findCommentIndex = comments.findIndex(i => i._id === comId);
  comments[findCommentIndex].comment = comment;
  return comments;
};

const updateDeleteComment = (comments, comId) => {
  const filterComments = comments.filter(com => com._id.toString() !== comId);
  return filterComments;
};

const updateCommentLike = (comments, comId, likes) => {
  const comIndex = comments.findIndex(com => com._id === comId);
  comments[comIndex].comment.likes = likes;
  return comments;
};

const updateCommentReplyLike = (comments, comId, repId, likes) => {
  const comIndex = comments.findIndex(com => com._id === comId);
  const repIndex = comments[comIndex].reply.findIndex(rep => rep._id === repId);
  comments[comIndex].reply[repIndex].likes = likes;
  return comments;
};

const updateCommentReply = (comments, comId, replies) => {
  const findCommentIndex = comments.findIndex(i => i._id === comId);
  // const findComment = comments.find(i => i._id === comId);
  comments[findCommentIndex].reply = replies;
  return comments;
};

const reducer = (state = initial_state, action) => {
  switch (action.type) {
    case actionTypes.FETCH_POSTS_START:
      return {
        ...state,
        loadingPosts: true,
        error: null
      };
    case actionTypes.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loadingPosts: false,
        error: null,
        posts: action.posts,
        totalposts: action.totalposts,
        currentPage: action.currentPage
      };
    case actionTypes.FETCH_POSTS_FAILED:
      return {
        ...state,
        posts: [],
        loadingPosts: false,
        error: null,
        totalposts: 0,
        currentPage: 1,
        loadingLike: false,
        post: {},
        postError: null,
        loadingPost: false,
        addCommentLoading: false,
        addReplyLoadign: false
      };
    case actionTypes.FETCH_POST_START:
      return {
        ...state,
        loadingPost: true
      };
    case actionTypes.FETCH_POST_SUCCESS:
      return {
        ...state,
        loadingPost: false,
        postError: null,
        post: action.post
      };
    case actionTypes.POST_LIKE_START:
      return {
        ...state,
        loadingLike: true
      };
    case actionTypes.POST_LIKE_SUCCESS:
      return {
        ...state,
        loadingLike: false,
        posts: state.posts.map(post =>
          post._id === action.postId ? { ...post, likes: action.likes } : post
        ),
        post: { ...updatePostLike(state.post, action.postId, action.likes) }
      };
    case actionTypes.ADD_COMMENT_START:
      return {
        ...state,
        addCommentLoading: true
      };
    case actionTypes.ADD_COMMENT_SUCCESS:
      return {
        ...state,
        addCommentLoading: false,
        post: {
          ...state.post,
          comments: action.comments,
          totalComments: action.totalComments
        }
      };
    case actionTypes.DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          totalComments: action.totalComments,
          comments: [...updateDeleteComment(state.post.comments, action.comId)]
        }
      };
    case actionTypes.LIKE_COMMENTS:
      return {
        ...state,
        post: {
          ...state.post,
          comments: [
            ...updateCommentLike(
              state.post.comments,
              action.comId,
              action.likes
            )
          ]
        }
      };
    case actionTypes.EDIT_COMMENT_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          comment: [
            ...updateSingleComment(
              state.post.comments,
              action.comId,
              action.comment
            )
          ]
        }
      };
    case actionTypes.ADD_COMMENT_REPLAY_START:
      return {
        ...state,
        addReplyLoadign: true
      };
    case actionTypes.ADD_COMMENT_REPLAY_SUCCESS:
      return {
        ...state,
        addReplyLoadign: false,
        post: {
          ...state.post,
          totalComments: action.totalComments,
          comments: [
            ...updateCommentReply(
              state.post.comments,
              action.comId,
              action.replies
            )
          ]
        }
      };
    case actionTypes.EDIT_COMMENT_REPLY_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          comments: [
            ...updateCommentReply(
              state.post.comments,
              action.comId,
              action.reply
            )
          ]
        }
      };
    case actionTypes.DELETE_COMMENT_REPLY_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          totalComments: action.totalComments,
          comments: [
            ...updateCommentReply(
              state.post.comments,
              action.comId,
              action.reply
            )
          ]
        }
      };
    case actionTypes.LIKE_COMMENTS_REPLY:
      return {
        ...state,
        post: {
          ...state.post,
          comments: [
            ...updateCommentReplyLike(
              state.post.comments,
              action.comId,
              action.repId,
              action.likes
            )
          ]
        }
      };

    default:
      return state;
  }
};

export default reducer;
