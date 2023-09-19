import React from "react";

import { FaChevronLeft } from "react-icons/fa";

const LeftArrow = props => {
  return (
    <button className="backArrow arrow" onClick={props.goToPrevSlide}>
      {/* <i className="fa fa-arrow-left fa-2x" aria-hidden="true"></i> */}
      <span style={{ color: "#333333" }}>
        <FaChevronLeft />
      </span>
    </button>
  );
};

export default LeftArrow;
