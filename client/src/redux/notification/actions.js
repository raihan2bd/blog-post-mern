import * as actionTypes from "./actionTypes";
import axios from "axios";

const fetchNotificationStart = () => ({
  type: actionTypes.FETCH_NOTIFICATION_START
});

const fetchNotificationFailed = err => ({
  type: actionTypes.FETCH_NOTIFICATION_FAILED,
  err
});

const fetchNotificationSuccess = (
  notifications,
  totalNotification,
  hasNextPage
) => {
  return {
    type: actionTypes.FETCH_NOTIFICATION_SUCCESS,
    notifications,
    totalNotification,
    hasNextPage
  };
};

export const fetchNotification = page => async dispatch => {
  let token;
  if (localStorage.getItem("token")) {
    token = JSON.parse(localStorage.getItem("token"));
  }

  const config = {
    headers: {
      "x-auth-token": token
    }
  };

  const currentPage = page;

  try {
    dispatch(fetchNotificationStart());
    const res = await axios.get(
      `/api/notification?page=${currentPage}`,
      config
    );
    const notifications = res.data.notifications;
    const totalNotification = res.data.totalNotification;
    const hasNextPage = res.data.hasNextPage;
    dispatch(
      fetchNotificationSuccess(notifications, totalNotification, hasNextPage)
    );
  } catch (err) {
    console.log(err.response.data.message);
    dispatch(fetchNotificationFailed(err.response.data.message));
  }
};

const fetchTotalNotificationSuccess = totalNotification => ({
  type: actionTypes.FETCH_NOTIFICATION_COUNT,
  totalNotification
});

export const fetchTotalNotification = userId => async dispatch => {
  let token;
  if (localStorage.getItem("token")) {
    token = JSON.parse(localStorage.getItem("token"));
  }

  const config = {
    headers: {
      "x-auth-token": token
    }
  };

  try {
    const res = await axios.get(`/api/notification/count`, config);
    dispatch(fetchTotalNotificationSuccess(res.data.totalNotification));
  } catch (err) {
    console.log(err.response);
  }
};

export const toggleNotification = () => {
  return {
    type: actionTypes.TOGGLE_NOTIFICATION
  };
};

export const showMoreNotification = () => ({
  type: actionTypes.SHOW_MORE_NOTIFICATION
});

export const hideNotification = () => ({
  type: actionTypes.HIDE_NOTIFICATION
});
