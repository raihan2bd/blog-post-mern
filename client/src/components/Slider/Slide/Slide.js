import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";

const Slide = props => {
  const styles = {
    backgroundImage: `url(/images/${props.image})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
    // backgroundPosition: "50% 50%"
  };
  return (
    <Fragment>
      <div className="slide" style={styles}>
        {props.children}
      </div>
    </Fragment>
  );
};

export default withRouter(Slide);
