import React, { useState, Fragment } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";

import * as actions from "../../../../../redux/post/actions";
import { formatDate } from "../../../../../utils/formatDate";

import MoreActions from "../../../MoreActions/MoreActions";
import AddReply from "../AddReply/AddReply";
import DeleteModel from "../../../../UI/DeleteModel/DeleteModel";
import Backdrop from "../../../../UI/Backdrop/Backdrop";
import LoginModel from "../../../../UI/LoginModel/LoginModel";
import "./Reply.css";

const Reply = ({
  reply,
  comId,
  handleShowAddReplay,
  isAuth,
  user,
  postId,
  onDeleteCommentReply,
  onLikeCommentReply,
  history
}) => {
  const [replyAction, setReplyAction] = useState(false);
  const [replyEdit, setReplyEdit] = useState(false);
  const [replyDelete, setReplyDelete] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [showLoginModel, setShowLoginModel] = useState(false);

  const toggleReplyMoreAction = () => {
    setReplyAction(!replyAction);
  };

  const toggleReplyEdit = () => {
    setReplyAction(false);
    setReplyEdit(!replyEdit);
  };

  const toggleReplyDelete = () => {
    setReplyAction(false);
    setReplyDelete(!replyDelete);
  };

  const confirmDeleteReply = () => {
    onDeleteCommentReply(postId, comId, reply._id);
    setReplyDelete(false);
    setReplyAction(false);
  };

  const cancelDeleteReply = () => {
    setReplyDelete(false);
    setReplyAction(false);
  };

  const cancelLogin = () => {
    setShowLoginModel(false);
  };

  const acceptLogin = () => {
    setShowLoginModel(false);
    history.push("/login");
  };

  const toggleCommentReplyLike = async () => {
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
          `/api/posts/comments/reply/like/${postId}/${comId}/${reply._id}`,
          null,
          config
        );
        console.log(res.data);
        await onLikeCommentReply(comId, reply._id, res.data.likes);
        setLikeLoading(false);
      } catch (err) {
        setLikeLoading(false);
        console.log(err.response);
      }
    }
  };

  const existLike = reply.likes.find(i => i.userId.toString() === user.id);

  const newDate = formatDate(new Date(reply.date));

  let showMoreActions = "";
  if (user.id === reply.userId && replyAction) {
    showMoreActions = (
      <MoreActions
        toggleEditing={toggleReplyEdit}
        toggleDeleting={toggleReplyDelete}
      />
    );
  }

  let myContent = (
    <div className="comment-reply">
      <div className="reply-left">
        <div className="user-reply-avatar">
          <img src={reply.avatar} alt={reply.username} />
        </div>
      </div>
      <div className="reply-right">
        <div className="reply-content">
          <div className="reply-user-info">
            <Link to={`/user/${reply.username}`}>{reply.username}</Link>
            <span style={{ color: "#a6a6a6" }}> {newDate}</span>
            {(isAuth && user.id === reply.userId) ||
            (isAuth && user.role === "admin") ? (
              <button
                style={{ color: replyAction ? "red" : "" }}
                onClick={toggleReplyMoreAction}
                className="more-action"
              >
                <FaEllipsisH />
              </button>
            ) : null}
            {showMoreActions}
          </div>
          <div className="reply-text">
            <p>{reply.text}</p>
          </div>
          <div className="reply-action">
            <div>
              <button
                disabled={likeLoading}
                onClick={toggleCommentReplyLike}
                className="reply-action-btn"
              >
                {existLike && isAuth ? <FaRegThumbsDown /> : <FaRegThumbsUp />}
              </button>
              <span style={{ color: "#333333", fontSize: "0.875rem" }}>
                {reply.likes.length}
              </span>
            </div>
            <div>
              <button
                onClick={handleShowAddReplay}
                className="reply-action-btn"
              >
                Reply
              </button>
            </div>
            {/* <button className="reply-action-btn">Like</button>
            <button onClick={handleShowAddReplay} className="reply-action-btn">
              Reply
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );

  if (
    (replyEdit && user.id === reply.userId) ||
    (replyEdit && user.role === "admin")
  ) {
    myContent = (
      <Fragment>
        <div className="show-model-handler">
          <AddReply
            postId={postId}
            comId={comId}
            editing={replyEdit}
            toggleEditing={toggleReplyEdit}
            reply={reply}
          />
        </div>
        <Backdrop isShow={replyEdit} clicked={toggleReplyEdit} />
      </Fragment>
    );
  } else if (
    (replyDelete && user.id === reply.userId) ||
    (replyDelete && user.role === "admin")
  ) {
    myContent = (
      <DeleteModel
        cancelDeleteHandler={cancelDeleteReply}
        confirmDeleteHandler={confirmDeleteReply}
        isShow={replyDelete}
        header="Delete Reply"
        content="Are you want to delete this Reply?"
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

const mapStateToProps = ({ auth: { isAuth, user } }) => ({
  isAuth,
  user
});

const mapDispatchToProps = dispatch => ({
  onDeleteCommentReply: (postId, comId, repId) =>
    dispatch(actions.deleteReply(postId, comId, repId)),
  onLikeCommentReply: (comId, repId, likes) =>
    dispatch(actions.likeCommentReply(comId, repId, likes))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Reply));
