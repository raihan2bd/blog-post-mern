import React from "react";
import { withRouter } from "react-router-dom";

import Posts from "../../components/PostCom/Posts/Posts";
import Aside from "../../components/Asside/Aside";

import "./PostsByCat.css";

const PostsByCat = props => {
  const catRoute = props.match.params.catId;
  return (
    <div className="postsbycats">
      <section className="section-posts">
        <h2 className="menu">Latest Posts</h2>
        <Posts catRoute={catRoute}></Posts>
      </section>
      <Aside />
    </div>
  );
};

export default withRouter(PostsByCat);
