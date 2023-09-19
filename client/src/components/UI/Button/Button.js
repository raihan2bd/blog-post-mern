import React from "react";

import "./Button.css";

const Button = ({ btnClass, children, ...otherProps }) => {
  const buttonClass = btnClass
    ? ["default-button", btnClass].join(" ")
    : "default-button";
  return (
    <button className={buttonClass} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
