import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegComment, FaRegShareSquare } from "react-icons/fa";

import { formatDate } from "../../../../utils/formatDate";
import Like from "../../Like/Like";
import Share from "../../Share/Share";

import "./Post.css";

const Post = props => {
  const [isShare, setIsShare] = useState(false);

  let trimmedString = props.content;
  trimmedString = props.content.substr();
  if (trimmedString.length > 250) {
    trimmedString = props.content.substr(0, 250);
    trimmedString = trimmedString.substr(
      0,
      Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
    );
    //trim the string to the maximum length
    //re-trim if we are in the middle of a word
  }

  const toggleShare = () => {
    setIsShare(!isShare);
  };

  const shareFb = () => {
    const url = `http://${window.location.host}/posts/${props._id}`;

    setIsShare(false);
    window.open(
      "https://www.facebook.com/sharer/sharer.php?u=" + url,
      "facebook-popup",
      "height=350,width=600"
    );
  };

  const shareTw = () => {
    const url = `http://${window.location.host}/posts/${props._id}`;
    setIsShare(false);
    window.open(
      "https://twitter.com/share?url=" + url,
      "twitter-popup",
      "height=350,width=600"
    );
  };

  const postDate = formatDate(new Date(props.date));

  return (
    <article className="article">
      <div className="article-content">
        <div className="article-thumb">
          <img src={`/images/${props.thumbnail}`} alt={props.title} />
        </div>
        <h2 className="article-title">
          <Link to={`/posts/${props._id}`}>{props.title}</Link>
        </h2>
        <h5 className="author-info">
          Posted By{" "}
          <Link to={`/users/${props.author.username}`}>
            {props.author.username}
          </Link>
          <span> {postDate} ago</span>
        </h5>
        <p className="art-content">
          {trimmedString}...<Link to={`/posts/${props._id}`}>Read More</Link>
        </p>
      </div>
      <div className="article-footer">
        <div className=""></div>
        <div className="af-action">
          <Like likes={props.likes} postId={props._id} />
          <div className="af-comment">
            <p className="af-info">
              {props.totalComments}{" "}
              {props.totalComments > 1 ? "Comments" : "Comment"}
            </p>
            <Link className="af-action-btn" to={`/posts/${props._id}`}>
              <FaRegComment />
              <span> Comment</span>
            </Link>
          </div>
          <div className="af-share">
            <button onClick={toggleShare} className="af-action-btn">
              <FaRegShareSquare />
              <span> Share</span>
            </button>
          </div>
        </div>
      </div>
      {isShare ? (
        <Share
          shareFb={shareFb}
          shareTw={shareTw}
          toggleShare={toggleShare}
          postId={props._id}
        />
      ) : null}
    </article>
  );
};

export default Post;
