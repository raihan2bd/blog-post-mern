import React from "react";

import SinglePost from "../../components/PostCom/SinglePost/SinglePost";
import Aside from "../../components/Asside/Aside";

import "./SinglePostPage.css";

const SinglePostPage = () => {
  return (
    <div className="single-post-page">
      <section className="single-post-section">
        <SinglePost />
      </section>
      <Aside />
    </div>
  );
};

export default SinglePostPage;
