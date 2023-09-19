import * as actionTypes from "./actionTypes";
import axios from "axios";
import * as msgActions from "../msg/actions";

const searchSuccess = (posts, currentPage, totalPost) => ({
  type: actionTypes.SEARCH_POST,
  posts,
  currentPage,
  totalPost
});

export const searchPost = (query, page = 1) => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/search?q=${query}&page=${page}`);
    const { posts, currentPage, totalPost } = res.data;
    dispatch(searchSuccess(posts, currentPage, totalPost));
  } catch (err) {
    dispatch(msgActions.addMsg(err.response.data.message));
  }
};
