import * as actionTypes from "./actionTypes";

const initial_state = {
  isError: false,
  msg: ""
};

const reducer = (state = initial_state, action) => {
  switch (action.type) {
    case actionTypes.ADD_MSG:
      return {
        ...state,
        isError: action.isError,
        msg: action.msg
      };
    case actionTypes.REMOVE_MSG:
      return {
        ...state,
        isError: false,
        msg: ""
      };

    default:
      return state;
  }
};

export default reducer;
