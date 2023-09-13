import React, { useState, Fragment } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { FaRegThumbsUp } from "react-icons/fa";

import * as actions from "../../../redux/post/actions";

import LoginModel from "../../UI/LoginModel/LoginModel";
import CustomSpinner from "../../UI/CustomSpinner/CustomSpinner";

import "./Like.css";

const Like = props => {
  const postId = props.postId;
  // const [loading, setLoading] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const likeExist = props.likes.find(i => i.userId === props.user.id) || false;

  const { loading, onLikePost } = props;

  const handleLike = e => {
    if (props.isAuth && props.user.id) {
      onLikePost(postId);
    } else {
      setShowModel(true);
    }
  };

  const acceptLogin = () => {
    setShowModel(false);
    props.history.push("/login");
  };

  const cancelLogin = () => {
    setShowModel(false);
  };

  let myLikes = "";
  if (loading && false) {
    myLikes = <CustomSpinner></CustomSpinner>;
  } else {
    myLikes = (
      <div className="af-like">
        <p className="af-info">
          {props.likes.length} {props.likes.length > 1 ? "Likes" : "Like"}
        </p>

        <button
          disabled={loading}
          onClick={handleLike}
          className="af-action-btn"
        >
          <FaRegThumbsUp />
          {likeExist && props.user.id ? (
            <span> Unlike</span>
          ) : (
            <span>Like</span>
          )}
        </button>
      </div>
    );
  }

  let myModel;
  if (showModel) {
    myModel = (
      <LoginModel
        acceptLogin={acceptLogin}
        cancelLogin={cancelLogin}
        show={showModel}
      />
    );
  }

  return (
    <Fragment>
      {myLikes}
      {myModel}
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    isAuth: state.auth.isAuth,
    loading: state.post.loadingLike
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLikePost: postId => dispatch(actions.likePost(postId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Like));
