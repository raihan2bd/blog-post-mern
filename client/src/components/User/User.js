import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "./User.css";

useEffect(
  props => {
    const { isAuth, history } = props;
    if (isAuth) {
    } else {
      history.push("/404");
    }
  },
  [isAuth]
);

const User = () => {
  return <div>Hello From User</div>;
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps)(withRouter(User));
