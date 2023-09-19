import React, { Fragment } from "react";

import Backdrop from "../../UI/Backdrop/Backdrop";
import "./Message.css";
import Button from "../Button/Button";

const Message = ({ clicked, msg, isError }) => {
  const msgCls = msg !== "" ? "msg-card show-msg" : "msg-card";
  const titleCls = isError ? "msg-title error" : "msg-title";

  let myMsg = "Something went wrong!";
  if (msg) {
    myMsg = msg;
  }
  return (
    <Fragment>
      <div className={msgCls}>
        <h2 className={titleCls}>
          {isError ? "An Error Occurred" : "A Message"}
        </h2>
        <div className="msg-content">{myMsg}</div>
        <div className="msg-action">
          <Button onClick={clicked} btnClass="danger p6">
            OK
          </Button>
        </div>
      </div>
      <Backdrop isShow={msg} clicked={clicked} />
    </Fragment>
  );
};

export default Message;
