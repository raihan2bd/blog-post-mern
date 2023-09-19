import React from "react";
import { FaChevronRight } from "react-icons/fa";

const RightArrow = props => {
  return (
    <button className="nextArrow arrow" onClick={props.goToNextSlide}>
      {/* <i className="fa fa-arrow-right fa-2x" aria-hidden="true"></i> */}
      <span
        style={{
          color: "#333333"
        }}
      >
        <FaChevronRight />
      </span>
    </button>
  );
};

export default RightArrow;
