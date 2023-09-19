import React, { useState, useEffect } from "react";
import Categories from "../Categories/Categories";
import axios from "axios";

import Service from "../Service/Service";

import "./Aside.css";

const Aside = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    let unmounted = false;
    const loadServices = async () => {
      try {
        const res = await axios.get("/api/services");
        if (!unmounted) {
          setServices(res.data.services);
        }
      } catch (err) {}
    };

    loadServices();

    return () => {
      unmounted = true;
    };
  }, []);

  let myService = "";
  if (services.length > 0) {
    myService = <Service {...services[0]} />;
  }
  return (
    <aside className="main-aside">
      {myService}
      <div className="aside-cat">
        <Categories />
      </div>
    </aside>
  );
};

export default Aside;
