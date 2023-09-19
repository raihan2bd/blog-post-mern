import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import AddService from "../../components/AddService/AddService";
import "./AddServicePage.css";

const AddServicePage = props => {
  const { user, isAuth, history } = props;
  useEffect(() => {
    if (!isAuth) {
      history.push("/login");
    } else if (user.role !== "admin") {
      history.push("/404");
    }
  });
  return (
    <Fragment>
      <AddService />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps)(withRouter(AddServicePage));
