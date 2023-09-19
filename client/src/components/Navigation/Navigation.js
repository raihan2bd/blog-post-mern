import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./Navigation.css";

import Backdrop from "../UI/Backdrop/Backdrop";
import MenuIcon from "../UI/MenuIcon/MenuIcon";
import Logo from "../UI/Logo/Logo";

const NavigationItems = ({ showNav, toggleShowNavHandler, isAuth, user }) => {
  const showNavClass = showNav
    ? ["navigation", "showNavigation"].join(" ")
    : "navigation";

  return (
    <>
      <div className="mobile-only">
        <nav className={showNavClass}>
          <div className="navigation__top">
            <MenuIcon menuClass clicked={toggleShowNavHandler} />
            <Logo>Your Logo</Logo>
          </div>
          <ul className="navigation-items">
            <li className="navigation-item">
              <NavLink
                onClick={toggleShowNavHandler}
                to="/"
                exact
                activeClassName="active"
              >
                Home
              </NavLink>
            </li>
            <li className="navigation-item">
              <NavLink
                onClick={toggleShowNavHandler}
                to="/categories"
                exact
                activeClassName="active"
              >
                Categories
              </NavLink>
            </li>
            <li className="navigation-item">
              <NavLink
                onClick={toggleShowNavHandler}
                to="/services"
                exact
                activeClassName="active"
              >
                Services
              </NavLink>
            </li>
            <li className="navigation-item">
              <NavLink
                onClick={toggleShowNavHandler}
                to="/about-us"
                exact
                activeClassName="active"
              >
                About us
              </NavLink>
            </li>
            <li className="navigation-item">
              <NavLink
                onClick={toggleShowNavHandler}
                to="/contact-us"
                exact
                activeClassName="active"
              >
                Contact us
              </NavLink>
            </li>
          </ul>
        </nav>
        <Backdrop isShow={showNav} clicked={toggleShowNavHandler} />
      </div>
      <div className="desktop-only">
        <nav className="navigation">
          <ul className="navigation-items">
            <li className="navigation-item">
              <NavLink to="/" exact activeClassName="active">
                Home
              </NavLink>
            </li>
            <li className="navigation-item">
              <NavLink to="/categories" exact activeClassName="active">
                Categories
              </NavLink>
            </li>
            <li className="navigation-item">
              <NavLink to="/services" exact activeClassName="active">
                Services
              </NavLink>
            </li>
            <li className="navigation-item">
              <NavLink to="/about-us" exact activeClassName="active">
                About us
              </NavLink>
            </li>
            <li className="navigation-item">
              <NavLink to="/contact-us" exact activeClassName="active">
                Contact us
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(withRouter(NavigationItems));
