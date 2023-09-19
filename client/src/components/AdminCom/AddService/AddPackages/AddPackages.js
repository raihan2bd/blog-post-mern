import React from "react";
import Input from "../../../UI/Input/Input";
import Card from "../../../UI/Card/Card";
import Button from "../../../UI/Button/Button";

const AddPackages = ({
  handleChange,
  isValid,
  previousStep,
  submitPackage,
  title,
  description,
  price,
  isPkgValid,
  nextStep
}) => {
  return (
    <div className="service-form">
      <Card>
        <h3>Add Service Packages</h3>
        <Input
          type="text"
          label="Title"
          name="title"
          value={title.value}
          onChange={handleChange}
          errMsg={title.errMsg}
          isError={title.isError}
          isTouched={title.isTouched}
        />
        <Input
          type="textarea"
          label="Description"
          name="description"
          value={description.value}
          onChange={handleChange}
          errMsg={description.errMsg}
          isError={description.isError}
          isTouched={description.isTouched}
        />
        <Input
          type="number"
          label="Price"
          name="price"
          value={price.value}
          onChange={handleChange}
          errMsg={price.errMsg}
          isError={price.isError}
          isTouched={price.isTouched}
        />
        <Button
          disabled={!isPkgValid}
          btnClass="success m8 block"
          onClick={submitPackage}
        >
          Add Package
        </Button>
        <Button btnClass="m8" onClick={previousStep}>
          Go Back
        </Button>
        <Button btnClass="success m8" disabled={!isValid} onClick={nextStep}>
          Continue
        </Button>
      </Card>
    </div>
  );
};

export default AddPackages;
