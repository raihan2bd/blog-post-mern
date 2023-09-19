import React from "react";

import Backdrop from "../Backdrop/Backdrop";
import Button from "../Button/Button";

import "./DeleteModel.css";

const DeleteModel = props => {
  return (
    <div className="delete-model">
      <div className="delete-wraper">
        <div className="delete-container">
          <header className="delete-header">{props.header}</header>
          <div className="delete-content">
            <p>{props.content}</p>
            <div className="delete-actions">
              <Button onClick={props.cancelDeleteHandler} btnClass="success p7">
                Cancel
              </Button>
              <Button onClick={props.confirmDeleteHandler} btnClass="danger p7">
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Backdrop isShow={props.isShow} clicked={props.cancelDeleteHandler} />
    </div>
  );
};

export default DeleteModel;
