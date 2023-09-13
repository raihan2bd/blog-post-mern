import React from "react";

const MoreActions = ({ toggleEditing, toggleDeleting }) => {
  return (
    <div className="more-actions">
      <ul className="ma-group">
        <li onClick={toggleEditing} className="ma-item">
          Edit
        </li>
        <li onClick={toggleDeleting} className="ma-item">
          Delete
        </li>
      </ul>
    </div>
  );
};

export default MoreActions;
