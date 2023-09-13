import React from "react";
import { withRouter } from "react-router-dom";
import Button from "../Button/Button";
import Backdrop from "../Backdrop/Backdrop";

import "./LoginModel.css";

const LoginModel = props => {
  return (
    <div className="login-model">
      <div className="model-content">
        <h1 className="model-header">Login Required</h1>
        <p>
          Inorder To like the post you have to login otherwise you can not like
          any post, Thank you.
        </p>
        <div className="model-action">
          <Button onClick={props.cancelLogin}>Cancel</Button>
          <Button btnClass="success" onClick={props.acceptLogin}>
            Login
          </Button>
        </div>
      </div>
      <Backdrop isShow={props.show} clicked={props.cancelLogin} />
    </div>
  );
};

export default withRouter(LoginModel);
