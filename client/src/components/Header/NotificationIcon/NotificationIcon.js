import React, { useEffect } from "react";
import { connect } from "react-redux";

import * as actions from "../../../redux/notification/actions";
import Notifications from "../../Notifications/Notifications";

import "./NotificationIcon.css";

const NotificationIcon = ({
  totalNotification,
  user,
  onFetchTotalNotification,
  onToggleNotification,
  showNotification
}) => {
  useEffect(() => {
    onFetchTotalNotification();
  }, [onFetchTotalNotification]);

  return (
    <div className="notification-icon">
      {showNotification ? (
        <button
          style={{ color: "#a1a1a1" }}
          onClick={onToggleNotification}
          className="r3-bell hm_icon"
        ></button>
      ) : (
        <button
          onClick={onToggleNotification}
          className="r3-bell hm_icon"
        ></button>
      )}

      {totalNotification > 0 ? (
        <span className="tatal-notification">{totalNotification}</span>
      ) : null}
      {showNotification ? <Notifications /> : null}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    totalNotification: state.ntfc.totalNotification,
    user: state.auth.user,
    showNotification: state.ntfc.showNotification
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchTotalNotification: () => dispatch(actions.fetchTotalNotification()),
    onToggleNotification: () => dispatch(actions.toggleNotification())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationIcon);
