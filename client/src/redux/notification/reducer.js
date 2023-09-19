import * as actionTypes from "./actionTypes";

const initial_state = {
  notifications: [],
  err: "",
  loading: true,
  showNotification: false,
  totalNotification: 0,
  page: 1,
  hasNextPage: false
};

const reducer = (state = initial_state, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_NOTIFICATION:
      return {
        ...state,
        showNotification: !state.showNotification,
        notifications: [],
        err: "",
        page: 1,
        hasNextPage: false
      };
    case actionTypes.HIDE_NOTIFICATION:
      return {
        ...state,
        showNotification: false,
        notifications: [],
        err: "",
        page: 1,
        hasNextPage: false
      };
    case actionTypes.FETCH_NOTIFICATION_COUNT:
      return {
        ...state,
        totalNotification: action.totalNotification
      };
    case actionTypes.FETCH_NOTIFICATION_START:
      return {
        ...state,
        err: "",
        loading: true
      };
    case actionTypes.FETCH_NOTIFICATION_SUCCESS:
      return {
        ...state,
        err: "",
        loading: false,
        notifications: [...state.notifications, ...action.notifications],
        hasNextPage: action.hasNextPage,
        totalNotification: state.totalNotification - action.totalNotification
      };
    case actionTypes.FETCH_NOTIFICATION_FAILED:
      return {
        ...state,
        err: action.err,
        loading: false,
        notifications: []
      };
    case actionTypes.SHOW_MORE_NOTIFICATION:
      return {
        ...state,
        page: state.page + 1
      };
    default:
      return state;
  }
};

export default reducer;
