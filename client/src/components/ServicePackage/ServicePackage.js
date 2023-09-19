import React from "react";

import "./ServicePackage.css";

const ServicePackage = props => {
  const { title, description, price } = props;
  return (
    <div className="service-package">
      <h4 className="p7 bg-grey">{title}</h4>
      <p className="p10">{description}</p>
      <h4 className="p7 bg-grey">${price}</h4>
    </div>
  );
};

export default ServicePackage;
