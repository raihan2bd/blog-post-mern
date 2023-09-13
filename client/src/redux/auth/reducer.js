import * as actionTypes from "./actionTypes";

const Initial_State = {
  loading: false,
  redirect: null,

  user: {},
  isAuth: false
};

const reducer = (state = Initial_State, action) => {
  switch (action.type) {
    case actionTypes.CLEAR_MSG:
      return {
        ...state,
        loading: false,
        isAuth: false,
        redirect: null
      };
    case actionTypes.LOGIN_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.LOGIN_FAILED:
      return {
        ...state,
        loading: false
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        isAuth: true
      };
    case actionTypes.SIGNUP_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actionTypes.SIGNUP_FAILED:
      return {
        ...state,
        loading: false
      };
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        redirect: "login",
        isAuth: false,
        user: {}
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        loading: false,
        redirect: null,
        user: {},
        isAuth: false
      };
    case actionTypes.AUTO_AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        redirect: null,
        user: action.user,
        isAuth: true
      };
    case actionTypes.AUTO_AUTH_FAILED:
      return {
        ...state,
        loading: false,
        redirect: null,
        user: {},
        isAuth: false
      };
    default:
      return state;
  }
};

export default reducer;
