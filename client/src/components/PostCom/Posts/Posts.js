import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as actions from "../../../redux/post/actions";

import Spinner from "../../UI/Spinner/Spinner";
import Post from "./Post/Post";
import Pagination from "../../UI/Pagination/Pagination";

import "./Posts.css";

const Posts = props => {
  const {
    posts,
    onFetchPosts,
    totalPosts,
    loadingPosts,
    currentPage,
    catRoute,
    userPost
  } = props;

  let query = new URLSearchParams(props.location.search);
  let page = 1;
  if (query.has("page")) {
    page = query.get("page");
  }

  useEffect(() => {
    if (catRoute) {
      onFetchPosts(page, catRoute);
    } else if (userPost) {
      onFetchPosts(page, null, userPost);
    } else {
      onFetchPosts(page);
    }
  }, [page, onFetchPosts, catRoute, userPost]);

  let myPosts = posts.map(post => {
    return <Post key={post._id} {...post} />;
  });
  let myContent;
  if (loadingPosts) {
    myContent = <Spinner />;
  } else if (!(posts.length >= 1)) {
    myContent = <h1>No Post Found</h1>;
  } else {
    myContent = (
      <Fragment>
        {myPosts}
        <Pagination
          totalPost={totalPosts}
          currentPage={currentPage}
          perPage={10}
        />
      </Fragment>
    );
  }

  return <div className="posts">{myContent}</div>;
};

const mapStateToProps = ({
  post: { posts, loadingPosts, error, totalPost, currentPage }
}) => {
  return {
    posts,
    loadingPosts,
    error,
    totalPost,
    currentPage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchPosts: (page, catRoute, userPost) =>
      dispatch(actions.fetchPosts(page, catRoute, userPost))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Posts));
