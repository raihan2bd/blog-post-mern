import React from "react";

import FeaturePost from "../../components/FeaturePost/FeaturePost";

const RemoveFeaturePost = () => {
  return (
    <div>
      <FeaturePost removeFeature={true} />
    </div>
  );
};

export default RemoveFeaturePost;
