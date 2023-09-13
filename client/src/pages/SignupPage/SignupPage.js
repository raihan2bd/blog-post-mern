import React, { useState, Fragment } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../redux/auth/actions";

import Card from "../../components/UI/Card/Card";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import { validateForm, checkPassword } from "../../utils/formvalidator";
import Spinner from "../../components/UI/Spinner/Spinner";

import "./SignupPage.css";

const SignupPage = props => {
  const { loading, msg, onSignup, isAuth, error, redirect } = props;
  const [formData, setFormData] = useState({
    formControl: {
      fullname: {
        type: "text",
        value: "",
        name: "fullname",
        label: "Full Name",
        config: {
          isRequired: true,
          isMinLength: 8,
          isMaxLength: 30,
          isString: true
        },
        isTouched: false,
        errMsg: "",
        isError: false
      },
      username: {
        type: "text",
        value: "",
        name: "username",
        label: "User Name",
        config: {
          isRequired: true,
          isMinLength: 6,
          isMaxLength: 25,
          isString: true
        },
        isTouched: false,
        errMsg: "",
        isError: false,
        isValid: false
      },
      email: {
        type: "text",
        value: "",
        name: "email",
        label: "Email",
        config: {
          isRequired: true,
          isString: true
        },
        isTouched: false,
        errMsg: "",
        isError: false,
        isValid: false
      },
      password: {
        type: "password",
        value: "",
        name: "password",
        label: "Password",
        config: {
          isRequired: true,
          isMinLength: 6,
          isMaxLength: 30,
          isString: true
        },
        isTouched: false,
        errMsg: "",
        isError: false,
        isValid: false
      },
      confirmPassword: {
        type: "password",
        value: "",
        name: "confirmPassword",
        label: "Confirm Password",
        isTouched: false,
        errMsg: "",
        isError: false,
        isValid: false
      }
    },

    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    isFormVaid: false
  });

  const handleChange = e => {
    const value = e.target.value;
    const rules = formData.formControl[e.target.name].config;
    const name = e.target.name;
    let newFormData = {};
    if (e.target.type === "checkbox") {
      newFormData = {
        ...formData,
        [e.target.name]: !formData[name]
      };
    } else if (e.target.name === "confirmPassword") {
      const pass = formData.formControl.password.value;
      newFormData = {
        ...formData,
        formControl: {
          ...formData.formControl,
          [e.target.name]: {
            ...formData.formControl[name],
            value: e.target.value,
            isTouched: true,
            ...checkPassword(pass, value)
          }
        }
      };
    } else {
      newFormData = {
        ...formData,
        formControl: {
          ...formData.formControl,
          [e.target.name]: {
            ...formData.formControl[name],
            value: e.target.value,
            isTouched: true,
            ...validateForm(rules, name, value)
          }
        }
      };
    }

    //Check All input is valid or not
    let isInputsValid = true;
    for (let key in newFormData.formControl) {
      isInputsValid = newFormData.formControl[key].isValid && isInputsValid;
    }
    setFormData({ ...newFormData, isFormVaid: isInputsValid });
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    if (formData.isFormVaid) {
      const signupData = {
        fullname: formData.formControl.fullname.value,
        username: formData.formControl.username.value,
        email: formData.formControl.email.value,
        password: formData.formControl.password.value,
        confirmPassword: formData.formControl.confirmPassword.value
      };
      onSignup(signupData);
    }
  };

  let formElement = [];

  for (let i in formData.formControl) {
    formElement.push(...[formData.formControl[i]]);
  }

  let myform = formElement.map((input, index) => {
    return (
      <Input
        key={input.name}
        type={input.type}
        name={input.name}
        value={input.value}
        label={input.label}
        handleChange={e => handleChange(e)}
        isError={input.isError}
        errMsg={input.errMsg}
        isTouched={input.isTouched}
      />
    );
  });

  let myContent;
  if (isAuth) {
    myContent = <Redirect to="/" />;
  } else if (redirect) {
    myContent = <Redirect to={`/${redirect}`} />;
  } else if (!loading) {
    let msgCls = "msg";
    if (error) {
      msgCls = "msg error";
    }

    myContent = (
      <Fragment>
        {msg ? <div className={msgCls}>{msg}</div> : null}
        <h3 className="form-title">Create your account</h3>
        <form onSubmit={handleFormSubmit}>
          {myform}
          <div className="form-action">
            <div>
              <span>
                By Clicking Signup Button you are Accept Our Terms and Condition
              </span>
              <Link to="/terms-adn-condition">Terms and Condition</Link>
            </div>
          </div>
          <Button
            disabled={!formData.isFormVaid}
            btnClass="defult-login"
            type="submit"
          >
            Signup
          </Button>
        </form>
        <div style={{ padding: "1rem" }}>
          <span>Already have a account </span>
          <Link to="/login">Login Now?</Link>
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

const mapStateToProps = ({
  auth: { isAuth, error, msg, loading, redirect }
}) => ({
  isAuth,
  error,
  msg,
  loading,
  redirect
});

const mapDispatchToProps = dispatch => ({
  onSignup: signupData => dispatch(actions.signup(signupData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SignupPage));
