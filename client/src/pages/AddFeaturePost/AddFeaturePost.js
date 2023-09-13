import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Card from "../../components/UI/Card/Card";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

const AddFeaturePost = ({ history, user, isAuth }) => {
  const [postId, setPostId] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (!isAuth) {
      history.push("/login");
    }
    if (isAuth && user.role !== "admin") {
      history.push("/404");
    }
  }, [isAuth, user, history]);

  const handleChange = e => {
    const value = e.target.value;
    setPostId(value);
    if (value) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (postId) {
      try {
        const data = {
          postId
        };

        let token;
        if (localStorage.getItem("token")) {
          token = JSON.parse(localStorage.getItem("token"));
        }

        const config = {
          headers: {
            "x-auth-token": token
          }
        };
        await axios.put("/api/admin/add-feature-post", data, config);
        history.push("/admin/remove-feature-post");
      } catch (err) {
        console.log(err.response);
      }
    }
  };
  return (
    <div className="add-feature-post">
      <Card>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            errMsg=""
            isError={false}
            label="Add post id"
            name="postId"
            value={postId}
            onChange={handleChange}
          />
          <Button
            disabled={!isFormValid}
            type="submit"
            btnClass="success btn-block"
          >
            Add Feature Post
          </Button>
        </form>
      </Card>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps)(withRouter(AddFeaturePost));
