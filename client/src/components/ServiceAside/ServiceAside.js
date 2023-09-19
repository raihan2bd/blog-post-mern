import React, { useEffect, useState } from "react";
import axios from "axios";

import Service from "../Service/Service";

const ServiceAside = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    let unmounted = false;
    const loadServices = async () => {
      try {
        const res = await axios.get("/api/services");
        if (!unmounted) {
          setServices(res.data.services);
        }
      } catch (err) {
        console.log(err.response);
      }
    };
    loadServices();
    return () => {
      unmounted = true;
    };
  }, []);

  let myContent = "";
  if (services.length > 0) {
    myContent = services.map(i => <Service key={i._id} {...i} />);
  }
  return (
    <aside className="service-aside">
      <h3 className="menu">Services you may like</h3>
      {myContent}
    </aside>
  );
};

export default ServiceAside;
