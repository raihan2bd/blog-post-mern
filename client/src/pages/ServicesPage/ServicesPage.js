import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";

import * as serviceActions from "../../redux/msg/actions";

import Card from "../../components/UI/Card/Card";
import Button from "../../components/UI/Button/Button";
import Service from "../../components/Service/Service";

import "./ServicesPage.css";

const ServicesPage = ({ history, onAddMsg }) => {
  const [services, setServices] = useState([]);
  const [feetch, setFetch] = useState(false);

  // Fatching data
  useEffect(() => {
    let unmounted = false;
    const loadServices = async () => {
      try {
        const res = await axios.get("/api/services/");
        if (!unmounted) {
          setServices(res.data.services);
          setFetch(true);
        }
      } catch (err) {
        onAddMsg(err.response.data.message, true);
        console.log(err.response);
      }
    };

    loadServices();
    return () => {
      unmounted = true;
    };
  }, [onAddMsg]);

  let myContent = "";

  if (services.length > 0 && feetch) {
    myContent = services.map(i => <Service key={i._id} {...i} />);
  } else if (feetch) {
    myContent = (
      <Card>
        <h1>NO Services Abaileable</h1>
        <br />
        <br />
        <br />
        <Button onClick={() => history.push("/")} btnClass="block p7 m10">
          Go Back TO Home
        </Button>
      </Card>
    );
  }

  return <div className="services-page">{myContent}</div>;
};

const mapDispatchToProps = dispatch => {
  return {
    onAddMsg: (msg, err) => dispatch(serviceActions.addMsg(msg, err))
  };
};

export default connect(null, mapDispatchToProps)(ServicesPage);
