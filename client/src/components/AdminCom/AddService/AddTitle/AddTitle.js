import React from "react";
import Input from "../../../UI/Input/Input";
import Card from "../../../UI/Card/Card";
import Button from "../../../UI/Button/Button";

const AddTitle = ({
  nextStep,
  value,
  handleChange,
  name,
  errMsg,
  isError,
  isTouched,
  isValid
}) => {
  return (
    <div className="service-form">
      <Card>
        <h3>Add Service Title</h3>
        <Input
          type="text"
          label="Title"
          name={name}
          value={value}
          onChange={handleChange}
          errMsg={errMsg}
          isError={isError}
          isTouched={isTouched}
        />
        <Button btnClass="success" disabled={!isValid} onClick={nextStep}>
          Continue
        </Button>
      </Card>
    </div>
  );
};

export default AddTitle;
