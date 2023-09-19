import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";

import * as actions from "../../redux/notification/actions";
import Spinner from "../UI/Spinner/Spinner";
import Notification from "./Notification/Notification";
import Button from "../UI/Button/Button";

import "./Notifications.css";

const Notifications = ({
  notifications,
  loading,
  err,
  page,
  onFetchNotification,
  hasNextPage,
  onShowMoreNotification,
  onHideNotification
}) => {
  useEffect(() => {
    onFetchNotification(page);
  }, [onFetchNotification, page]);

  let myNtfcs = "";
  if (notifications.length > 0) {
    myNtfcs = notifications.map(i => {
      return (
        <Notification
          key={i._id}
          {...i}
          onHideNotification={onHideNotification}
        />
      );
    });
  }

  let myContent = "";
  if (loading) {
    myContent = <Spinner />;
  } else if (err || err !== "") {
    myContent = (
      <div className="notification_err">
        <p>{err}</p>
      </div>
    );
  } else if (notifications.length > 0) {
    myContent = (
      <Fragment>
        <header className="notification-header">Notifications</header>
        {myNtfcs}
        {hasNextPage ? (
          <Button
            onClick={onShowMoreNotification}
            btnClass="show_more_notification_btn p5"
          >
            Show More
          </Button>
        ) : null}
      </Fragment>
    );
  } else {
    myContent = (
      <div onClick={onShowMoreNotification} className="no-notifications">
        No Notifications Found
      </div>
    );
  }

  return <div className="notifications">{myContent}</div>;
};

const mapStateToProps = state => ({
  notifications: state.ntfc.notifications,
  err: state.ntfc.err,
  loading: state.ntfc.loading,
  page: state.ntfc.page,
  hasNextPage: state.ntfc.hasNextPage
});

const mapDispatchToProps = dispatch => ({
  onFetchNotification: page => dispatch(actions.fetchNotification(page)),
  onShowMoreNotification: () => dispatch(actions.showMoreNotification()),
  onHideNotification: () => dispatch(actions.hideNotification())
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
