import React from "react";
import { NavLink } from "react-router-dom";

import Backdrop from "../../UI/Backdrop/Backdrop";

import "./AdminNavigation.css";

const AdminNavigation = ({ isAdminNavShow, closeAdminNavHandler }) => {
  let myClass = "admin-navigation";
  if (isAdminNavShow) {
    myClass = "admin-navigation show-admin-nav";
  }
  return (
    <div className={myClass}>
      <nav className="an__nav">
        <h1 className="admin-dashboard-header">
          Admin Dashboard
          <span
            onClick={closeAdminNavHandler}
            className="mobile-only close-admin-nav"
          >
            X
          </span>
        </h1>
        <ul className="an__nav-group">
          <li onClick={closeAdminNavHandler} className="an__nav-goup-list">
            <NavLink to="/admin/add-service" activeClassName="active-admin-nav">
              Add Service
            </NavLink>
          </li>
          <li onClick={closeAdminNavHandler} className="an__nav-goup-list">
            <NavLink
              to="/admin/add-category"
              activeClassName="active-admin-nav"
            >
              Add Category
            </NavLink>
          </li>
          <li onClick={closeAdminNavHandler} className="an__nav-goup-list">
            <NavLink
              to="/admin/add-feature-post"
              activeClassName="active-admin-nav"
            >
              Add Feature Post
            </NavLink>
          </li>
          <li onClick={closeAdminNavHandler} className="an__nav-goup-list">
            <NavLink
              to="/admin/remove-feature-post"
              activeClassName="active-admin-nav"
            >
              Remove Feature Post
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="mobile-only">
        <Backdrop isShow={true} clicked={closeAdminNavHandler} />
      </div>
    </div>
  );
};

export default AdminNavigation;
