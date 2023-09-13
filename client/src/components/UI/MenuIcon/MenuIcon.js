import React from "react";

import "./MenuIcon.css";

const MenuIcon = ({ clicked, menuClass }) => {
  const newMenuClas = menuClass
    ? ["r3-menu menu-icon", "active-menu-icon"].join(" ")
    : "r3-menu menu-icon";

  return <span onClick={clicked} className={newMenuClas}></span>;
};

export default MenuIcon;
