import React, { Fragment } from "react";

import Comment from "./Comment/Comment";
import AddComment from "../AddComment/AddComment";

import "./Comments.css";

const Comments = ({ comments, postId }) => {
  const myComments = comments.map(i => (
    <Comment
      key={i._id}
      comment={i.comment}
      comId={i._id}
      reply={i.reply}
      className="comment"
      postId={postId}
    />
  ));
  return (
    <div className="comments">
      <Fragment>
        <h2 className="menu">Comments</h2>
        <AddComment postId={postId} />
        {comments.length < 1 ? null : myComments}
      </Fragment>
    </div>
  );
};

export default Comments;
