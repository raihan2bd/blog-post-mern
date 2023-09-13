import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../redux/auth/actions";

import Button from "../../UI/Button/Button";

import "./Me.css";

const Me = props => {
  const { onLogout, user } = props;
  const [showMeContent, setSowMeContent] = useState(false);
  const handleShowMeContent = () => {
    setSowMeContent(!showMeContent);
  };

  const meCls = showMeContent ? "me me-showing" : "me";

  const meContentCls = showMeContent
    ? "me__content show-me__content"
    : "me__content";

  let myAdmin = null;
  if (user.role === "admin") {
    myAdmin = (
      <li onClick={handleShowMeContent} className="me__content-item">
        <Link to="/admin">Admin Dashboard</Link>
      </li>
    );
  }

  return (
    <div className={meCls}>
      <img
        onClick={handleShowMeContent}
        className="me__avatar"
        src={user.avatar}
        alt={user.username}
      />
      <div className={meContentCls}>
        <ul className="me__content-list">
          <div onClick={handleShowMeContent} className="me__info">
            <div className="me__info-avatar">
              <img
                className="me__avatar"
                src={user.avatar}
                alt={user.username}
              />
            </div>
            <div className="me__info-user">{user.username}</div>
          </div>
          <li onClick={handleShowMeContent} className="me__content-item">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li onClick={handleShowMeContent} className="me__content-item">
            <Link to="/add-post">Create Post</Link>
          </li>
          {myAdmin}
        </ul>
        <div className="me__action">
          <Button btnClass="login" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapStateTopops = state => {
  return {
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(actions.logout())
});

export default connect(mapStateTopops, mapDispatchToProps)(Me);
