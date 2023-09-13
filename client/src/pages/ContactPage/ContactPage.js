import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";

import Input from "../../components/UI/Input/Input";
import Card from "../../components/UI/Card/Card";
import Button from "../../components/UI/Button/Button";
import { validateForm } from "../../utils/formvalidator";

import "./ContactPage.css";

const ContactPage = props => {
  const { isAuth, user } = props;
  const [formData, setFormData] = useState({
    formControl: {
      name: {
        name: "name",
        value: "",
        config: {
          isRequired: true,
          isMinLength: 3,
          isMaxLength: 55
        },
        isTouched: false,
        errMsg: "",
        isError: false
      },
      email: {
        name: "email",
        value: "",
        config: {
          isEmail: true
        },
        isTouched: false,
        errMsg: "",
        isError: false
      },
      title: {
        name: "title",
        value: "",
        config: {
          isRequired: true,
          isMinLength: 8,
          isMaxLength: 255,
          isString: true
        },
        isTouched: false,
        errMsg: "",
        isError: false
      },
      message: {
        name: "message",
        value: "",
        config: {
          isRequired: true,
          isMinLength: 20,
          isMaxLength: 555,
          isString: true
        },
        isTouched: false,
        errMsg: "",
        isError: false
      }
    },
    isFormValid: false
  });

  const onChangeHandler = e => {
    const { name, value } = e.target;
    const rules = formData.formControl[name].config;
    let newFormData = {
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

    //Check All input is valid or not
    let isInputsValid = true;
    if (isAuth && user.id) {
      isInputsValid =
        newFormData.formControl.title.isValid &&
        newFormData.formControl.message.isValid &&
        isInputsValid;
    } else {
      for (let key in newFormData.formControl) {
        isInputsValid = newFormData.formControl[key].isValid && isInputsValid;
      }
    }
    /// set FormData
    setFormData({ ...newFormData, isFormValid: isInputsValid });
  }; // end of ChangeHandler

  const onSubmitHandler = async e => {
    e.preventDefault();
    /// check form is Valid
    if (formData.isFormValid) {
      let myFormData;
      if (isAuth && user.id) {
        myFormData = {
          title: formData.formControl.title.value,
          message: formData.formControl.message.value
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
          const res = await axios.post(
            `/api/other/user/contact-us`,
            myFormData,
            config
          );
          console.log(res.data);
        } catch (err) {
          console.log(err.response);
        }
      } else {
        myFormData = {
          title: formData.formControl.title.value,
          message: formData.formControl.message.value,
          name: formData.formControl.name.value,
          email: formData.formControl.email.value
        };
        try {
          const res = await axios.post(`/api/other/contact-us`, myFormData);
          console.log(res.data);
        } catch (err) {
          console.log(err.response);
        }
      } /// end of myFormData
    }
  };

  let myForm = "";
  if (isAuth && user.id) {
    myForm = (
      <form onSubmit={onSubmitHandler}>
        <Input
          type="text"
          name="title"
          value={formData.formControl.title.value}
          label="Title"
          onChange={onChangeHandler}
          isTouched={formData.formControl.title.isTouched}
          isError={formData.formControl.title.isError}
          errMsg={formData.formControl.title.errMsg}
        />
        <Input
          type="textarea"
          name="message"
          value={formData.formControl.message.value}
          label="Message"
          onChange={onChangeHandler}
          isTouched={formData.formControl.message.isTouched}
          isError={formData.formControl.message.isError}
          errMsg={formData.formControl.message.errMsg}
        />
        <Button
          disabled={!formData.isFormValid}
          btnClass="success btn-block"
          type="submit"
        >
          Submit
        </Button>
      </form>
    );
  } else {
    myForm = (
      <form onSubmit={onSubmitHandler}>
        <Input
          type="text"
          name="name"
          value={formData.formControl.name.value}
          label="Name"
          onChange={onChangeHandler}
          isTouched={formData.formControl.name.isTouched}
          isError={formData.formControl.name.isError}
          errMsg={formData.formControl.name.errMsg}
        />
        <Input
          type="text"
          name="email"
          value={formData.formControl.email.value}
          label="E-mail"
          onChange={onChangeHandler}
          isTouched={formData.formControl.email.isTouched}
          isError={formData.formControl.email.isError}
          errMsg={formData.formControl.email.errMsg}
        />
        <Input
          type="text"
          name="title"
          value={formData.formControl.title.value}
          label="Title"
          onChange={onChangeHandler}
          isTouched={formData.formControl.title.isTouched}
          isError={formData.formControl.title.isError}
          errMsg={formData.formControl.title.errMsg}
        />
        <Input
          type="textarea"
          name="message"
          value={formData.formControl.message.value}
          label="Message"
          onChange={onChangeHandler}
          isTouched={formData.formControl.message.isTouched}
          isError={formData.formControl.message.isError}
          errMsg={formData.formControl.message.errMsg}
        />
        <Button
          disabled={!formData.isFormValid}
          btnClass="success btn-block"
          type="submit"
        >
          Submit
        </Button>
      </form>
    );
  }

  return (
    <div className="contact-page">
      <Card>
        <h3>In order to contact us please fill up bellow form.</h3>
        <p> Then We will contact you</p>
        {myForm}
      </Card>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  user: state.auth.user
});

export default connect(mapStateToProps)(ContactPage);
