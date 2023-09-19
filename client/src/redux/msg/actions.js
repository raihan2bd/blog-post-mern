import * as actionTypes from "./actionTypes";

export const addMsg = (msg, isError = true) => ({
  type: actionTypes.ADD_MSG,
  msg,
  isError
});

export const removeMsg = () => ({
  type: actionTypes.REMOVE_MSG
});
