import React from "react";

import "./SingleFeaturePost.css";

const SingleFeaturePost = ({ title, _id, thumbnail, clicked, thumbId }) => {
  let imageUrl = `/images/${thumbnail}`
  if (thumbId) {
    imageUrl = `${thumbId.path}/${thumbnail}`
  }
  return (
    <div className="single-feature-post">
      <div className="sfp__thumbnail">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="sfp__action">
        <h3>{title}</h3>
        <span onClick={() => clicked(_id)} className="sfp__remove-feature">
          X
        </span>
      </div>
    </div>
  );
};

export default SingleFeaturePost;
