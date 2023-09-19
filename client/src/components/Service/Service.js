import React from "react";
import { Link } from "react-router-dom";

import "./Service.css";

const Service = props => {
  const { title, images, description, _id } = props;

  let trimmedString = description;
  trimmedString = description.substr();
  if (trimmedString.length > 100) {
    trimmedString = description.substr(0, 100);
    trimmedString = trimmedString.substr(
      0,
      Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
    );
  }

  return (
    <div className="service">
      <Link to={`/services/${_id}`}>
        <div className="service-title">
          <h4>{title}</h4>
        </div>
        <div className="service-img">
          <img src={`/images/${images[0].image}`} alt={title} />
        </div>
        <div className="service-des">{trimmedString}</div>
      </Link>
    </div>
  );
};

export default Service;
