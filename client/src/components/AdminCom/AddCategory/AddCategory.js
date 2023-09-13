import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { withRouter } from "react-router-dom";

import { validateForm } from "../../../utils/formvalidator";

import Card from "../../UI/Card/Card";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";

import "./AddCategori.css";

const AddCategory = ({ user, isAuth, history }) => {
  const [formData, setFormData] = useState({
    formControl: {
      title: {
        type: "text",
        value: "",
        name: "title",
        label: "Title",
        config: {
          isRequired: true,
          isMinLength: 5,
          isMaxLength: 255,
          isString: true
        },
        isTouched: false,
        errMsg: "",
        isError: false,
        isValid: false
      },
      route: {
        type: "text",
        value: "",
        name: "route",
        label: "Route",
        config: {
          isRequired: true,
          isMinLength: 5,
          isMaxLength: 255,
          isString: true
        },
        isTouched: false,
        errMsg: "",
        isError: false,
        isValid: false
      },
      description: {
        type: "textarea",
        value: "",
        name: "description",
        label: "description",
        config: {
          isRequired: true,
          isMinLength: 10,
          isMaxLength: 555,
          isString: true
        },
        isTouched: false,
        errMsg: "",
        isError: false,
        isValid: false
      }
    },
    isFormValid: false
  });

  useEffect(() => {
    if (!isAuth && user.role !== "admin") {
      history.push("/404");
    }
  }, [isAuth, user.role, history]);

  const handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    const rules = formData.formControl[name].config;
    let newFormData = { ...formData };
    if (name === "thumbnail") {
      newFormData = {
        ...formData,
        formControl: {
          ...formData.formControl,
          [e.target.name]: {
            ...formData.formControl[name],
            value: e.target.value,
            isTouched: true,
            file: e.target.files[0],
            ...validateForm(rules, name, value)
          }
        }
      };
    } else {
      newFormData = {
        ...formData,
        formControl: {
          ...formData.formControl,
          [e.target.name]: {
            ...formData.formControl[name],
            value: e.target.value,
            isTouched: true,
            ...validateForm(rules, name, value)
          }
        }
      }; //end newFormData
    }

    //Check All input is valid or not
    let isInputsValid = true;
    for (let key in newFormData.formControl) {
      isInputsValid = newFormData.formControl[key].isValid && isInputsValid;
    }
    setFormData({ ...newFormData, isFormValid: isInputsValid });
  }; //end handleChange

  const handleSubmit = async e => {
    e.preventDefault();
    const data = {
      title: formData.formControl.title.value,
      route: formData.formControl.route.value,
      description: formData.formControl.description.value
    };
    let token;
    if (localStorage.getItem("token")) {
      token = JSON.parse(localStorage.getItem("token"));
    }

    const config = {
      headers: {
        "x-auth-token": token
      }
    };

    try {
      const res = await axios.post("/api/admin/category", data, config);
      history.push(`/categories/${res.data.category.route}`);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="add-categori">
      <Card>
        <h2>Add Category</h2>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Enter title here"
            name="title"
            label="Title"
            onChange={handleChange}
            value={formData.formControl.title.value}
            isError={formData.formControl.title.isError}
            errMsg={formData.formControl.title.errMsg}
          />

          <Input
            type="text"
            placeholder="Enter Route here"
            name="route"
            label="Route"
            onChange={handleChange}
            value={formData.formControl.route.value}
            isError={formData.formControl.route.isError}
            errMsg={formData.formControl.route.errMsg}
          />
          <Input
            type="textarea"
            placeholder="Enter description here"
            name="description"
            label="Description"
            onChange={handleChange}
            value={formData.formControl.description.value}
            isError={formData.formControl.description.isError}
            errMsg={formData.formControl.description.errMsg}
          />

          <Button
            type="submit"
            btnClass="success"
            disabled={!formData.isFormValid}
          >
            Add Categori
          </Button>
        </form>
      </Card>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    isAuth: state.auth.isAuth
  };
};

export default connect(mapStateToProps)(withRouter(AddCategory));
