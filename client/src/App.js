import React, { Fragment, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { setAutoAuth } from "./redux/auth/actions";

import Header from "./components/Header/Header";
// import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import Error404 from "./pages/404/404";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import PostsPage from "./pages/PostsPage/PostsPage";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import PostsByCatPage from "./pages/PostsByCat/PostsByCat";
import AddPostPage from "./pages/AddPostPage/AddPostPage";
import SinglePostPage from "./pages/SinglePostPage/SinglePostPage";
import EditPostPage from "./pages/EditPostPage/EditPostPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import EditProfilePage from "./pages/EditProfilePage/EditProfilePage";
import ServicesPage from "./pages/ServicesPage/ServicesPage";
import ServicePage from "./pages/ServicePage/ServicePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import UserPage from "./pages/UserPage/UserPage";
import AddDetails from "./pages/AddDetails/AddDetails";

import AdminPage from "./pages/AdminPage/AdminPage";

import "./assets/css/r3-font-icon.css";
import "./App.css";

function App(props) {
  const { onSetAutoAuth, user, isAuth } = props;

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      onSetAutoAuth();
    }
  }, [onSetAutoAuth, token]);

  return (
    <Fragment>
      <Header />
      <main className="main">
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/posts" component={PostsPage} />
          <Route exact path="/posts/:postId" component={SinglePostPage} />
          <Route exact path="/services" component={ServicesPage} />
          <Route exact path="/services/:serviceId" component={ServicePage} />
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/about-us" component={AboutPage} />
          <Route exact path="/contact-us" component={ContactPage} />
          <Route exact path="/users/:username" component={UserPage} />
          {/* private routes */}
          <Route exact path="/add-profile-details" component={AddDetails} />
          <Route exact path="/dashboard" component={DashboardPage} />
          <Route exact path="/edit-profile" component={EditProfilePage} />
          <Route exact path="/add-post" component={AddPostPage} />
          <Route
            exact
            path="/posts/edit-post/:postId"
            component={EditPostPage}
          />

          <Route path="/admin" component={AdminPage} />
          <Route exact path="/categories" component={CategoriesPage} />
          <Route exact path="/categories/:catId" component={PostsByCatPage} />
          <Route exact path="/" component={HomePage} />
          <Route path="/" component={Error404} />
        </Switch>
      </main>
    </Fragment>
  );
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => ({
  onSetAutoAuth: () => dispatch(setAutoAuth())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
