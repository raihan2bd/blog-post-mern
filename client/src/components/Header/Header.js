import React, { useState, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as sharedAction from "../../redux/shared/action";
import * as msgActions from "../../redux/msg/actions";

import Logo from "../UI/Logo/Logo";
import MenuIcon from "../UI/MenuIcon/MenuIcon";
import CustomSearch from "../CustomSearch/CustomSearch";
import Button from "../UI/Button/Button";
import Navigation from "../Navigation/Navigation";
import Me from "./Me/Me";
import Message from "../UI/Message/Message";
import NotificationIcon from "./NotificationIcon/NotificationIcon";

import "./Header.css";

const Header = props => {
  const { isAuth, user, onSearchPost, msg, isError, onRemoveMsg } = props;
  const [showNav, setShowNav] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [search, setSearch] = useState("");

  const toggleShowNavHandler = () => {
    setShowNav(!showNav);
  };

  const toggleActiveSearchHandler = () => {
    setIsSearchActive(!isSearchActive);
  };

  const searchChange = async e => {
    setSearch(e.target.value);
  };

  const submitSearch = async e => {
    e.preventDefault();
    // const query = new URLSearchParams(props.location.search);
    // const q = query.get("q") || " ";
    onSearchPost(search);
    props.history.push(`/search?q=${search}`);
  };
  return (
    <header className="header">
      <div className="h__main">
        <div className="hm__left">
          <div className="mobile-only">
            <MenuIcon clicked={toggleShowNavHandler} />
          </div>
          <Logo />
        </div>
        <div className="hm__middle">
          <div className="desktop-only">
            <form onSubmit={submitSearch}>
              <div className="input-search-group">
                <input
                  className="isg-input"
                  type="search"
                  name="search"
                  value={search}
                  onChange={searchChange}
                  placeholder="Search Here.."
                />
                <button type="submit" className="isg-btn">
                  <span className="r3-search"></span>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="hm__right">
          <div className="mobile-only">
            {isSearchActive ? (
              <CustomSearch
                searchChange={searchChange}
                submitSearch={submitSearch}
                toggleActiveSearchHandler={toggleActiveSearchHandler}
                search={search}
              />
            ) : null}
            <span
              onClick={() => toggleActiveSearchHandler()}
              className="r3-search hm_icon"
            ></span>
          </div>
          {isAuth && user.id ? (
            <Fragment>
              <NotificationIcon />
              <Me></Me>
            </Fragment>
          ) : (
            <Fragment>
              <Button
                onClick={() => props.history.push("/login")}
                btnClass="login"
              >
                Login
              </Button>
              <div className="desktop-only">
                <Button
                  onClick={() => props.history.push("/signup")}
                  btnClass="login"
                >
                  Signup
                </Button>
              </div>
            </Fragment>
          )}
        </div>
      </div>
      <Navigation
        showNav={showNav}
        toggleShowNavHandler={toggleShowNavHandler}
      />
      <Message msg={msg} isError={isError} clicked={onRemoveMsg} />
    </header>
  );
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  user: state.auth.user,
  msg: state.msg.msg,
  isError: state.msg.isError
});

const mapDispatchToProps = dispatch => ({
  onSearchPost: query => dispatch(sharedAction.searchPost(query)),
  onRemoveMsg: () => dispatch(msgActions.removeMsg())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
