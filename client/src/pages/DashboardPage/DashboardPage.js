import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";

import Button from "../../components/UI/Button/Button";
import Posts from "../../components/PostCom/Posts/Posts";

import "./DashboardPage.css";

const DashboardPage = props => {
  const { isAuth, history, localUser } = props;
  const [user, setUser] = useState({});

  useEffect(() => {
    if (isAuth) {
      const loadUser = async () => {
        try {
          let token;
          if (localStorage.getItem("token")) {
            token = JSON.parse(localStorage.getItem("token"));
          }
          const config = {
            headers: {
              "x-auth-token": token
            }
          };
          const res = await axios.get(`/api/profile/me`, config);
          setUser(res.data.user);
        } catch (err) {
          console.log(err.response);
        }
      };
      loadUser();
    } else {
      history.push("/login");
    }
  }, [isAuth, history]);

  const editDetailsHandler = () => {
    props.history.push("/add-profile-details");
  };

  let myUser = "";
  if (user._id) {
    myUser = (
      <div className="user-dashboard__main">
        <div className="user-dashboard__profile-pic">
          <img src={user.avatar} alt={user.userName} />
        </div>
        <h3>{user.username}</h3>
        <p className="user-status">
          {user.status ? user.status : "No Status Found"}
        </p>
        <div className="user-dashboard__profile-details">
          <ul className="user-details">
            <Button btnClass="success btn-block" onClick={editDetailsHandler}>
              Edit Details
            </Button>
            <li className="user-detail">
              FullName:{" "}
              <span style={{ fontWeight: "bold" }}>{user.fullname}</span>
            </li>
            <li className="user-detail">Email: {user.email}</li>
            <li className="user-detail">About: {user.about}</li>
            <li className="user-detail">Website: {user.website}</li>
            <li className="user-detail">Location: {user.location}</li>
            <li className="user-detail">Company: {user.company}</li>
            <li className="user-detail">Skills: {user.skills}</li>
            <li className="user-detail">Facebook: {user.facebook}</li>
            <li className="user-detail">Twitter: {user.twitter}</li>
            <li className="user-detail">Instagram: {user.instagram}</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="user-dashboard">
      {myUser}
      <div className="user-dashboard-posts">
        {user._id ? (
          <Fragment>
            <h3 className="menu">Posts By User</h3>
            <Posts userPost={localUser.id} />
          </Fragment>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  localUser: state.auth.user
});

export default connect(mapStateToProps)(withRouter(DashboardPage));
