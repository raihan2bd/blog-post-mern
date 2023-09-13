import React from "react";
import { withRouter } from "react-router-dom";

import Card from "../../components/UI/Card/Card";
import Button from "../../components/UI/Button/Button";

const Error404 = props => {
  return (
    <section>
      <Card>
        <h1>
          <span style={{ color: "red", fontSize: "2rem" }}>404</span> Page Not
          Found!
        </h1>
        <p>The page your want to look not found in our server </p>
        <Button
          style={{
            padding: "10px",
            marginTop: "10%"
          }}
          onClick={() => props.history.push("/")}
        >
          GO BACK TO HOME
        </Button>
      </Card>
    </section>
  );
};

export default withRouter(Error404);
