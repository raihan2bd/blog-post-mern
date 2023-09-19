import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

import AdminNavigation from "../../components/AdminCom/AdminNavigation/AdminNavigation";
import AddService from "../../components/AdminCom/AddService/AddService";
import AddCategory from "../../components/AdminCom/AddCategory/AddCategory";
import AddFeaturePost from "../AddFeaturePost/AddFeaturePost";
// import RemoveFeaturePost from "../RemoveFeaturePost/RemoveFeaturePost";
import RemoveFeaturePost from "../../components/PostCom/FeaturePost/FeaturePost";
import Button from "../../components/UI/Button/Button";

import "./AdminPage.css";

const AdminPage = () => {
  const [isAdminNavShow, setIsAdminShow] = useState(false);
  const openAdminNavHandler = () => {
    setIsAdminShow(true);
  };
  const closeAdminNavHandler = () => {
    setIsAdminShow(false);
  };
  return (
    <div className="admin-page">
      <AdminNavigation
        isAdminNavShow={isAdminNavShow}
        closeAdminNavHandler={closeAdminNavHandler}
      />
      <div className="admin-page-content">
        <Button
          onClick={openAdminNavHandler}
          btnClass="p5 admin-nav-button mobile-only"
        >
          <FaArrowRight />
        </Button>
        <Switch>
          <Route exact path="/admin/add-service" component={AddService} />
          <Route exact path="/admin/add-category" component={AddCategory} />
          <Route
            exact
            path="/admin/add-feature-post"
            component={AddFeaturePost}
          />
          <Route
            exact
            path="/admin/remove-feature-post"
            render={() => <RemoveFeaturePost removeFeature={true} />}
          />
          <Route path="/" component={AddService} />
        </Switch>
      </div>
    </div>
  );
};

export default AdminPage;
