import React, { useState, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FaEllipsisH, FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import axios from "axios";

import * as actions from "../../../../redux/post/actions";
import { formatDate } from "../../../../utils/formatDate";
// import userDefaultAvatar from "../../../assets/images/avatar.png";
import AddReplay from "./AddReply/AddReply";
import Reply from "./Reply/Reply";
import ShowMorePagination from "../../../UI/ShowMorePagination/ShowMorePagination";
import AddComment from "../../AddComment/AddComment";
import Backdrop from "../../../UI/Backdrop/Backdrop";

import "./Comment.css";
import DeleteModel from "../../../UI/DeleteModel/DeleteModel";
import MoreActions from "../../MoreActions/MoreActions";
import LoginModel from "../../../UI/LoginModel/LoginModel";

const Comment = ({
  comId,
  history,
  comment,
  reply,
  isAuth,
  user,
  postId,
  onLikeComment,
  onDeleteComment
}) => {
  const [showAddReplay, setShowAddReplay] = useState(false);
  const [showMoreAction, setShowMoreAction] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);
  const [editing, setEditing] = useState(false);
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [showLoginModel, setShowLoginModel] = useState(false);

  const handleShowAddReplay = () => {
    setShowAddReplay(!showAddReplay);
  };

  const handleMoreClick = () => {
    setShowMoreAction(!showMoreAction);
  };

  const handleShowMore = () => {
    setCurrentPage(currentPage + 1);
  };
  const handleShowLess = () => {
    setCurrentPage(currentPage - 1);
  };

  const toggleEditing = e => {
    setShowMoreAction(false);
    setEditing(!editing);
  };

  const toggleDeleting = () => {
    setShowDeleteModel(!showDeleteModel);
  };

  const cancelDeleteHandler = () => {
    setShowDeleteModel(false);
    setShowMoreAction(false);
  };

  const confirmDeleteHandler = async () => {
    let token;
    if (localStorage.getItem("token")) {
      token = JSON.parse(localStorage.getItem("token"));
    }
    const config = {
      headers: {
        "x-auth-token": token
      }
    };
    try {
      const res = await axios.delete(
        `/api/posts/comments/${postId}/${comId}`,
        config
      );
      await onDeleteComment(comId, res.data.totalComments);
      console.log(res.data);
    } catch (err) {
      console.log(err.response);
      setShowDeleteModel(false);
    }
  };

  const cancelLogin = () => {
    setShowLoginModel(false);
  };

  const acceptLogin = () => {
    setShowLoginModel(false);
    history.push("/login");
  };

  const toggleCommentLike = async () => {
    if (!isAuth && !user.id) {
      setShowLoginModel(true);
    } else {
      setLikeLoading(true);
      let token;
      if (localStorage.getItem("token")) {
        token = JSON.parse(localStorage.getItem("token"));
      }

      const config = {
        headers: {
          "x-auth-token": token
        }
      };
      try {
        const res = await axios.put(
          `/api/posts/comments/like/${postId}/${comId}`,
          null,
          config
        );
        console.log(res.data);
        await onLikeComment(comId, res.data.likes);
        setLikeLoading(false);
      } catch (err) {
        setLikeLoading(false);
        console.log(err.response);
      }
    }
  };

  const totalReply = reply.length;
  const myReply = reply.slice(0, perPage * currentPage);
  const commentDate = formatDate(new Date(comment.date));
  const myReplies = myReply.map(i => (
    <Reply
      key={i._id}
      reply={i}
      comId={comId}
      handleShowAddReplay={handleShowAddReplay}
      postId={postId}
    />
  ));

  const hasNextPage = Math.ceil(totalReply / perPage) > currentPage;
  const hasPrevPage = currentPage > 1;
  let showMoreActions = "";
  if (user.id === comment.userId && showMoreAction) {
    showMoreActions = (
      <MoreActions
        toggleEditing={toggleEditing}
        toggleDeleting={toggleDeleting}
      />
    );
  }

  const existLike = comment.likes.find(i => i.userId.toString() === user.id);

  let myContent = (
    <Fragment>
      <div className="comment">
        <div className="comment-left">
          <div className="user-avatar">
            <img src={comment.avatar} alt={comment.username} />
          </div>
        </div>
        <div className="comment-right">
          <div className="comment-author-info">
            <Link to={`/user/${comment.username}`}>{comment.username}</Link>{" "}
            <span style={{ color: "#a6a6a6" }}> {commentDate} ago</span>
            {(isAuth && user.id === comment.userId) ||
            (isAuth && user.role === "admin") ? (
              <button
                style={{ color: showMoreAction ? "red" : "" }}
                onClick={handleMoreClick}
                className="more-action"
              >
                <FaEllipsisH />
              </button>
            ) : null}
            {showMoreActions}
          </div>
          <div className="comment-content">
            <p>{comment.text}</p>
          </div>
          <div className="comment-actions">
            <div>
              <button
                disabled={likeLoading}
                onClick={toggleCommentLike}
                className="com-action-btn"
              >
                {existLike && isAuth ? <FaRegThumbsDown /> : <FaRegThumbsUp />}
              </button>
              <span style={{ color: "#333333" }}>
                {comment.likes.length}{" "}
                {comment.likes.length > 1 ? "likes" : "like"}
              </span>
            </div>
            <div>
              <span style={{ color: "#333333" }}>{totalReply}</span>
              <button onClick={handleShowAddReplay} className="com-action-btn">
                Reply
              </button>
            </div>
          </div>
          {showAddReplay ? (
            <AddReplay
              comId={comId}
              handleShowAddReplay={handleShowAddReplay}
            />
          ) : null}
          {myReplies}
          <ShowMorePagination
            label="Reply"
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            handleShowLess={handleShowLess}
            handleShowMore={handleShowMore}
          />
        </div>
      </div>
    </Fragment>
  );
  if (editing) {
    myContent = (
      <Fragment>
        <div className="show-model-handler">
          <AddComment
            postId={postId}
            comment={comment}
            editing={editing}
            toggleEditing={toggleEditing}
            comId={comId}
          />
        </div>
        <Backdrop isShow={editing} clicked={toggleEditing} />
      </Fragment>
    );
  } else if (showDeleteModel) {
    myContent = (
      <DeleteModel
        cancelDeleteHandler={cancelDeleteHandler}
        confirmDeleteHandler={confirmDeleteHandler}
        isShow={showDeleteModel}
        header="Delete Comment"
        content="Are you shure that you want to delete this comment ?"
      />
    );
  } else if (showLoginModel) {
    myContent = (
      <LoginModel
        show={showLoginModel}
        cancelLogin={cancelLogin}
        acceptLogin={acceptLogin}
      />
    );
  }
  return myContent;
};

const mapStateToProps = ({ auth: { user, isAuth } }) => ({
  user,
  isAuth
});

const mapDispatchToProps = dispatch => ({
  onDeleteComment: (postId, comId) =>
    dispatch(actions.deleteComment(postId, comId)),
  onLikeComment: (comId, likes) => dispatch(actions.likeComment(comId, likes))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Comment));
