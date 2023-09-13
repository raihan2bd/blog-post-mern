import React, { useState, useEffect } from "react";
import axios from "axios";

import ServiceAside from "../../components/ServiceAside/ServiceAside";
import ServicePackage from "../../components/ServicePackage/ServicePackage";
import Slider from "../../components/Slider/Slider";

import "./ServicePage.css";

const ServicePage = props => {
  const serviceId = props.match.params.serviceId;
  const [service, setService] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transformValue, setTransformValue] = useState(0);

  useEffect(() => {
    const loadService = async () => {
      try {
        const res = await axios.get("/api/services/" + serviceId);
        setService(res.data.service);
      } catch (err) {
        console.log(err.response);
      }
    };
    loadService();
  }, [serviceId]);

  const slideWidth = () => {
    return document.querySelector(".slide").clientWidth;
  };

  const nextSlide = () => {
    if (currentIndex === service.images.length - 1) {
      setCurrentIndex(0);
      setTransformValue(0);
    } else {
      setCurrentIndex(currentIndex + 1);
      setTransformValue(transformValue + -slideWidth());
    }
  };

  const previousSlide = () => {
    if (currentIndex === 0) {
      return;
    }

    setCurrentIndex(currentIndex - 1);
    setTransformValue(transformValue + slideWidth());
  };

  let myPackages;
  if (service.packages) {
    myPackages = service.packages.map(i => (
      <ServicePackage key={i._id} {...i} />
    ));
  }

  let myContent = "";
  if (service) {
    myContent = (
      <section className="service-section">
        <div className="svc__title">
          <h4>{service.title}</h4>
        </div>
        <Slider
          currentIndex={currentIndex}
          transFormValue={transformValue}
          slides={service.images}
          nextSlide={nextSlide}
          previousSlide={previousSlide}
        />
        <div className="svc__packages">{myPackages}</div>
        <div className="svc__des">
          <p>{service.description}</p>
        </div>
      </section>
    );
  }

  return (
    <div className="service-page">
      {myContent}
      <ServiceAside></ServiceAside>
    </div>
  );
};

export default ServicePage;
