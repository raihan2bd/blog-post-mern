import React from "react";

import Posts from "../../components/PostCom/Posts/Posts";
import Aside from "../../components/Asside/Aside";
import FeaturePost from "../../components/PostCom/FeaturePost/FeaturePost";
import "./HomePage.css";

const HomePage = () => (
  <div className="homepage">
    <section className="section-posts">
      <FeaturePost />
      <h2 className="menu">Latest Posts</h2>
      <Posts></Posts>
    </section>
    <Aside />
  </div>
);

export default HomePage;
