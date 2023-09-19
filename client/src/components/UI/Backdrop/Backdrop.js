import React from "react";

import "./Backdrop.css";

const Backdrop = ({ isShow, clicked, children }) => {
  const showBackdrop = isShow
    ? ["backdrop", "showBackdrop"].join(" ")
    : "backdrop";
  return (
    <div onClick={clicked} className={showBackdrop}>
      {children}
    </div>
  );
};

export default Backdrop;
