import React from "react";
import Slide from "./Slide/Slide";
import LeftArrow from "./LeftArrow/LeftArrow";
import RightArrow from "./RightArrow/RightArrow";
import { Link } from "react-router-dom";

import "./Slider.css";

const Slider = props => {
  const {
    currentIndex,
    transFormValue,
    nextSlide,
    previousSlide,
    slides,
    featurePosts
  } = props;

  let mySlide = "";
  if (slides) {
    mySlide = slides.map((i, index) => (
      <Slide key={index + Date.now()} image={i.image}></Slide>
    ));
  } else if (featurePosts) {
    mySlide = featurePosts.map(i => (
      <Slide key={i._id} image={i.thumbId.path+'/'+i.thumbnail}>
        <Link className="slide-title" to={`/posts/${i._id}`}>
          {i.title}
        </Link>
      </Slide>
    ));
  }

  return (
    <div className="slider">
      <div
        className="slider-wrapper"
        style={{
          transform: `translateX(${transFormValue}px)`,
          transition: "transform ease-out 0.45s"
        }}
      >
        {mySlide}
      </div>
      {currentIndex !== 0 ? <LeftArrow goToPrevSlide={previousSlide} /> : null}

      <RightArrow goToNextSlide={nextSlide} />
    </div>
  );
};

export default Slider;
