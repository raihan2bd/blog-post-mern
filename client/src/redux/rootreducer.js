import { combineReducers } from "redux";

import authReducer from "./auth/reducer";
import postReducer from "./post/reducer";
import shareReducer from "./shared/reducer";
import msgReducer from "./msg/reducer";
import notificationReducer from "./notification/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  shared: shareReducer,
  msg: msgReducer,
  ntfc: notificationReducer
});

export default rootReducer;
