import React from "react";
import { Link } from "react-router-dom";
import { FaRegComment, FaRegThumbsUp } from "react-icons/fa";

import { formatDate } from "../../../utils/formatDate";

import "./Notification.css";

const Notification = ({
  title,
  msg,
  from,
  postId,
  comId,
  repId,
  onHideNotification,
  date
}) => {
  const postDate = formatDate(new Date(date));

  let link = `/posts/${postId}`;
  if (comId) {
    link = `/posts/${postId}#${comId}`;
  } else if (repId) {
    link = `/posts/${postId}#${repId}`;
  }

  let icon = <FaRegThumbsUp />;
  if (title === "comment") {
    icon = <FaRegComment />;
  }
  return (
    <div onClick={onHideNotification} className="notification">
      <Link to={link} className="">
        <span className="ntfc-icon">{icon}</span>
        <span className="ntfc-username">{from.username} </span>{" "}
        <span>{msg}</span> <span className="ntfc-date">{postDate} ago</span>
      </Link>
    </div>
  );
};

export default Notification;
