import React, { useState, Fragment } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../redux/auth/actions";

import Card from "../../components/UI/Card/Card";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";

import "./LoginPage.css";

const LoginPage = props => {
  const { loading, isAuth, onLogin } = props;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false
  });

  const handleChange = e => {
    if (e.target.type === "checkbox") {
      setFormData({
        ...formData,
        [e.target.name]: !formData[e.target.name]
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    onLogin(formData.email, formData.password);
  };

  let myContent;
  if (isAuth) {
    myContent = <Redirect to="/" />;
  } else if (!loading) {
    myContent = (
      <Fragment>
        <h3 className="form-title">Login Your Account</h3>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            value={formData.email}
            handleChange={e => handleChange(e)}
            label="Email"
            placeholder="Enter your email here"
          />
          <Input
            type="password"
            name="password"
            value={formData.password}
            handleChange={e => handleChange(e)}
            label="Password"
            placeholder="Enter your password here"
          />
          <div className="form-action">
            <div className="remember-checkbox">
              <input
                type="checkbox"
                name="remember"
                onClick={e => handleChange(e)}
              />
              <label>Remember me</label>
            </div>
            <div>
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </div>
          <Button btnClass="defult-login" type="submit">
            Login
          </Button>
        </form>
        <div style={{ padding: "1rem" }}>
          <span>Don't have an account </span>
          <Link to="/signup">Signup Now?</Link>
        </div>
      </Fragment>
    );
  } else {
    myContent = <Spinner />;
  }

  return (
    <section>
      <Card>{myContent}</Card>
    </section>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    isAuth: state.auth.isAuth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (email, password) => dispatch(actions.login(email, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginPage));
