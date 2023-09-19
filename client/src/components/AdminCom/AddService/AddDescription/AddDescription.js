import React from "react";
import Input from "../../../UI/Input/Input";
import Card from "../../../UI/Card/Card";
import Button from "../../../UI/Button/Button";

const AddDescription = ({
  handleSubmit,
  value,
  handleChange,
  name,
  errMsg,
  isError,
  isTouched,
  isValid,
  previousStep
}) => {
  return (
    <div className="service-form">
      <Card>
        <h3>Add Service Description</h3>
        <Input
          type="textarea"
          label="Description"
          name={name}
          value={value}
          onChange={handleChange}
          errMsg={errMsg}
          isError={isError}
          isTouched={isTouched}
        />
        <Button btnClass="m8" onClick={previousStep}>
          Go Back
        </Button>
        <Button
          btnClass="success m8"
          disabled={!isValid}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Card>
    </div>
  );
};

export default AddDescription;
