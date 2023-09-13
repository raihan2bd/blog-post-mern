import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import AddTitle from "./AddTitle/AddTitle";
import AddTags from "./AddTags/AddTags";
import AddImages from "./AddImages/AddImages";
import { validateForm } from "../../../utils/formvalidator";
import AddPackages from "./AddPackages/AddPackages";
import AddDescription from "./AddDescription/AddDescription";

const AddService = () => {
  const [step, setStep] = useState(1);
  const [formValue, setFormValue] = useState({
    title: "",
    description: "",
    tags: "",
    images: null,
    imagesUrl: [],
    packages: []
  });

  const [pkg, setPkg] = useState({
    title: {
      config: {
        isRequired: true,
        isMinLength: 4,
        isMaxLength: 255,
        isString: true
      },
      value: "",
      isTouched: false,
      errMsg: "",
      isError: false,
      isValid: false
    },
    description: {
      config: {
        isRequired: true,
        isMinLength: 20,
        isMaxLength: 555,
        isString: true
      },
      value: "",
      isTouched: false,
      errMsg: "",
      isError: false,
      isValid: false
    },
    price: {
      config: {
        isRequired: true,
        isMinLength: 1,
        isMaxLength: 55,
        isNumber: true
      },
      value: 0,
      isTouched: false,
      errMsg: "",
      isError: false,
      isValid: false
    }
  });

  const [isPkgValid, setIsPkgValid] = useState(false);

  const [formConfig, setFormConfig] = useState({
    title: {
      config: {
        isRequired: true,
        isMinLength: 10,
        isMaxLength: 255,
        isString: true
      },
      isTouched: false,
      errMsg: "",
      isError: false,
      isValid: false
    },
    tags: {
      config: {
        isRequired: true,
        isMinWord: 4,
        isMaxWord: 25
      },
      isTouched: false,
      errMsg: "",
      isError: false,
      isValid: false
    },
    images: {
      config: {
        // isTotalImages: 3
        isRequired: true
      },
      isTouched: false,
      errMsg: "",
      isError: false,
      isValid: false
    },
    description: {
      config: {
        isRequired: true,
        isMinLength: 20,
        isMaxLength: 1000,
        isString: true
      },
      isTouched: false,
      errMsg: "",
      isError: false,
      isValid: false
    }
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const previousStep = () => {
    setStep(step - 1);
  };

  const handleChange = e => {
    const name = e.target.name;
    if (e.target.type === "file") {
      const myformValue = { ...formValue };
      myformValue[name] = e.target.files;
      console.log(myformValue[name]);
      setFormValue(myformValue);

      const myFormConfig = {
        ...formConfig
      };
      myFormConfig[name] = {
        ...myFormConfig[name],
        isTouched: true,
        ...validateForm(formConfig[name].config, name, myformValue[name])
      };
      setFormConfig(myFormConfig);
      console.log(myformValue[name]);
    } else {
      const myformValue = { ...formValue };
      myformValue[name] = e.target.value;
      setFormValue(myformValue);
      const myFormConfig = {
        ...formConfig
      };
      myFormConfig[name] = {
        ...myFormConfig[name],
        isTouched: true,
        ...validateForm(formConfig[name].config, name, myformValue[name])
      };
      setFormConfig(myFormConfig);
    }
  };

  const handlePkgChange = e => {
    const name = e.target.name;
    let myPkg = { ...pkg };
    myPkg = {
      ...myPkg,
      [e.target.name]: {
        ...pkg[name],
        isTouched: true,
        value: e.target.value,
        ...validateForm(pkg[name].config, name, e.target.value)
      }
    };
    setPkg(myPkg);
    let isInputsValid = true;
    for (let key in myPkg) {
      isInputsValid = pkg[key].isValid && isInputsValid;
    }
    setIsPkgValid(isInputsValid);
  };

  const submitPackage = e => {
    const { title, description, price } = pkg;
    if (title.value || description.value || price.value) {
      // const myPkg = {
      //   title: title.value,
      //   description: description.value,
      //   price: price.value
      // };
      const myFormData = { ...formValue };
      myFormData.packages.push({
        title: title.value,
        description: description.value,
        price: price.value
      });
      setFormValue(myFormData);
    }

    setPkg({
      ...pkg,
      title: {
        ...pkg.title,
        value: ""
      },
      description: {
        ...pkg.description,
        value: ""
      },
      price: {
        ...pkg.price,
        value: ""
      }
    });

    setIsPkgValid(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const myForm = new FormData();
    const { title, tags, description, images, packages } = formValue;

    const myPackage = JSON.stringify(packages);

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("tags", tags);
    myForm.append("packages", myPackage);
    for (let x = 0; x < images.length; x++) {
      myForm.append("images", images[x]);
    }

    let token = localStorage.getItem("token");
    if (token) {
      token = JSON.parse(token);
    }
    const config = {
      headers: {
        "x-auth-token": token,
        "Content-Type": "multipart/form-data"
      }
    };

    try {
      const res = await axios.post("/api/services/", myForm, config);
      console.log(res.data);
    } catch (err) {
      console.log(err.response);
    }
  }; ///end handle submit

  switch (step) {
    case 1:
      return (
        <AddTitle
          handleChange={handleChange}
          nextStep={nextStep}
          name="title"
          value={formValue.title}
          isError={formConfig.title.isError}
          errMsg={formConfig.title.errMsg}
          isTouched={formConfig.title.isTouched}
          isValid={formConfig.title.isValid}
        />
      );
    case 2:
      return (
        <AddTags
          handleChange={handleChange}
          nextStep={nextStep}
          name="tags"
          value={formValue.tags}
          isError={formConfig.tags.isError}
          errMsg={formConfig.tags.errMsg}
          isTouched={formConfig.tags.isTouched}
          isValid={formConfig.tags.isValid}
          previousStep={previousStep}
        />
      );
    case 3:
      return (
        <AddImages
          handleChange={handleChange}
          nextStep={nextStep}
          name="images"
          isError={formConfig.images.isError}
          errMsg={formConfig.images.errMsg}
          isTouched={formConfig.images.isTouched}
          isValid={formConfig.images.isValid}
          previousStep={previousStep}
        />
      );
    case 4:
      return (
        <AddPackages
          handleChange={handlePkgChange}
          nextStep={nextStep}
          previousStep={previousStep}
          title={pkg.title}
          description={pkg.description}
          price={pkg.price}
          submitPackage={submitPackage}
          isPkgValid={isPkgValid}
          isValid={formValue.packages.length > 0 ? true : false}
        />
      );
    case 5:
      return (
        <AddDescription
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          name="description"
          value={formValue.description}
          isError={formConfig.description.isError}
          errMsg={formConfig.description.errMsg}
          isTouched={formConfig.description.isTouched}
          isValid={formConfig.description.isValid}
          previousStep={previousStep}
        />
      );
    default:
      return <Redirect to="/404" />;
  }
};

export default AddService;
