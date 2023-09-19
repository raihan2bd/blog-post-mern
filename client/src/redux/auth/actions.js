import * as actionTypes from "./actionTypes";
import * as msgActions from "../msg/actions";
import axios from "axios";
import jwt from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";

const startLogin = () => {
  return {
    type: actionTypes.LOGIN_START
  };
};

const loginFailed = msg => {
  return {
    type: actionTypes.LOGIN_FAILED,
    payload: msg
  };
};

const loginSuccess = user => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: { msg: "Login Success!", user }
  };
};

export const login = (email, password) => dispatch => {
  dispatch(startLogin());
  const data = {
    email,
    password
  };

  axios
    .post("/api/users/login", { ...data })
    .then(res => {
      const token = res.data.token;
      localStorage.setItem("token", JSON.stringify(token));
      const decode = jwt(token);
      const user = decode.user;
      dispatch(loginSuccess(user));
      setAuthToken(token);
    })
    .catch(err => {
      dispatch(msgActions.addMsg(err.response.data.message));
      dispatch(loginFailed(err.response.data.message));
    });
};

const startSignup = () => {
  return {
    type: actionTypes.SIGNUP_START
  };
};

const signupFailed = msg => {
  msgActions.addMsg(msg);
  return {
    type: actionTypes.SIGNUP_FAILED,
    msg: msg
  };
};

const signupSuccess = msg => {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
    msg: msg
  };
};

export const signup = signupData => dispatch => {
  dispatch(startSignup());
  axios
    .post("/api/users/signup", signupData)
    .then(res => {
      dispatch(signupSuccess(res.data.msg));
    })
    .catch(err => {
      dispatch(msgActions.addMsg(err.response.data.message));
      dispatch(signupFailed(err.response.data.message));
    });
};

const logoutSuccess = () => ({
  type: actionTypes.LOGOUT
});

export const logout = () => dispatch => {
  const token = localStorage.getItem("token");
  if (token) {
    localStorage.removeItem("token");
  }
  dispatch(logoutSuccess());
};

const setAuthSuccess = user => {
  return {
    type: actionTypes.AUTO_AUTH_SUCCESS,
    user
  };
};

const setAuthFailed = () => {
  return {
    type: actionTypes.AUTO_AUTH_FAILED
  };
};

export const setAutoAuth = () => dispatch => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    const decode = jwt(token);
    const exp = decode.exp;
    const currentTime = Date.now() / 1000;
    if (exp > currentTime) {
      dispatch(setAuthSuccess(decode.user));
    } else {
      localStorage.removeItem("token");
      dispatch(setAuthFailed());
    }
  }
};
