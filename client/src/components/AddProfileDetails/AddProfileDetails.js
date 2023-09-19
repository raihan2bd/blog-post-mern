import React, { useState, useEffect } from "react";
import { validateForm } from "../../utils/formvalidator";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";

import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";

const AddProfileDetails = props => {
  const { isAuth, history } = props;
  const [useData, setUseData] = useState(false);
  const [formData, setFormData] = useState({
    formControll: {
      status: {
        name: "status",
        value: "",
        config: {
          isRequired: true,
          isMinLength: 5,
          isMaxLength: 55
        },
        isTouched: false,
        isError: false,
        errMsg: "",
        isValid: false
      },
      about: {
        name: "about",
        value: "",
        config: {
          isRequired: true,
          isMinLength: 25,
          isMaxLength: 555
        },
        isTouched: false,
        isError: false,
        errMsg: "",
        isValid: false
      },
      skills: {
        value: "",
        name: "skills",
        config: {
          isMinWord: 2,
          isMaxWord: 25
        },
        isTouched: false,
        errMsg: "",
        isError: false,
        isValid: true
      },
      company: {
        name: "company",
        value: "",
        config: {
          isMinLength: 5,
          isMaxLength: 55
        },
        isTouched: false,
        isError: false,
        errMsg: "",
        isValid: true
      },
      website: {
        name: "website",
        value: "",
        config: {
          isMinLength: 5,
          isMaxLength: 55
        },
        isTouched: false,
        isError: false,
        errMsg: "",
        isValid: true
      },
      location: {
        name: "location",
        value: "",
        config: {
          isMinLength: 5,
          isMaxLength: 55
        },
        isTouched: false,
        isError: false,
        errMsg: "",
        isValid: true
      },
      facebook: {
        name: "facebook",
        value: "",
        config: {
          isMinLength: 5,
          isMaxLength: 55
        },
        isTouched: false,
        isError: false,
        errMsg: "",
        isValid: true
      },
      twitter: {
        name: "twitter",
        value: "",
        config: {
          isMinLength: 5,
          isMaxLength: 55
        },
        isTouched: false,
        isError: false,
        errMsg: "",
        isValid: true
      },
      instagram: {
        name: "instagram",
        value: "",
        config: {
          isMinLength: 5,
          isMaxLength: 55
        },
        isTouched: false,
        isError: false,
        errMsg: "",
        isValid: true
      }
    },
    isFormVaid: false
  });

  useEffect(() => {
    if (!isAuth) {
      history.push("/login");
    } else {
      const loadUserProfileDetails = async () => {
        let token;
        if (localStorage.getItem("token")) {
          token = JSON.parse(localStorage.getItem("token"));
        }
        try {
          const config = {
            headers: {
              "x-auth-token": token
            }
          };
          const res = await axios.get("/api/profile/me", config);
          const profileDetails = res.data.user;
          let updatedFormData = formData;
          updatedFormData.formControll.status.value =
            profileDetails.status || "";
          updatedFormData.formControll.about.value = profileDetails.about || "";
          updatedFormData.formControll.website.value =
            profileDetails.website || "";
          updatedFormData.formControll.location.value =
            profileDetails.location || "";
          updatedFormData.formControll.skills.value =
            profileDetails.skills || "";
          updatedFormData.formControll.company.value =
            profileDetails.company || "";
          updatedFormData.formControll.facebook.value =
            profileDetails.facebook || "";
          updatedFormData.formControll.twitter.value =
            profileDetails.twitter || "";
          updatedFormData.formControll.instagram.value =
            profileDetails.instagram || "";
          updatedFormData.isFormVaid = true;
          setFormData(updatedFormData);
          setUseData(true);
        } catch (err) {
          console.log(err);
        }
      };
      if (!useData) {
        loadUserProfileDetails();
      }
    }
  }, [isAuth, history, useData, formData]);

  const changeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    const rules = formData.formControll[name].config;
    let newFormData = { ...formData };
    newFormData = {
      ...formData,
      formControll: {
        ...formData.formControll,
        [e.target.name]: {
          ...formData.formControll[name],
          value: e.target.value,
          isTouched: true,
          ...validateForm(rules, name, value)
        }
      }
    }; //end newFormData

    let isInputsValid = true;
    for (let key in newFormData.formControll) {
      isInputsValid = newFormData.formControll[key].isValid && isInputsValid;
    }
    setFormData({ ...newFormData, isFormVaid: isInputsValid });
  };
  const submitHandler = async e => {
    e.preventDefault();
    if (isAuth) {
      const myFormData = {};
      myFormData.status = formData.formControll.status.value;
      myFormData.about = formData.formControll.about.value;
      myFormData.skills = formData.formControll.skills.value;
      myFormData.company = formData.formControll.company.value;
      myFormData.location = formData.formControll.location.value;
      myFormData.website = formData.formControll.website.value;
      myFormData.facebook = formData.formControll.facebook.value;
      myFormData.twitter = formData.formControll.twitter.value;
      myFormData.instagram = formData.formControll.instagram.value;

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
        const res = await axios.put(
          "/api/profile/edit-details",
          myFormData,
          config
        );
        console.log(res.data);
        history.push("/dashboard");
      } catch (err) {
        console.log(err.response);
      }
    }
  };
  return (
    <div className="add-profile-details">
      <Card>
        <h3 className="center">Update Profile Details</h3>
        <form onSubmit={submitHandler}>
          <Input
            type="text"
            name={formData.formControll.status.name}
            value={formData.formControll.status.value}
            onChange={changeHandler}
            isTouched={formData.formControll.status.isTouched}
            isError={formData.formControll.status.isError}
            errMsg={formData.formControll.status.errMsg}
            label="Status"
          />
          <Input
            type="textarea"
            name={formData.formControll.about.name}
            value={formData.formControll.about.value}
            onChange={changeHandler}
            isTouched={formData.formControll.about.isTouched}
            isError={formData.formControll.about.isError}
            errMsg={formData.formControll.about.errMsg}
            label="About"
          />
          <Input
            type="text"
            name={formData.formControll.skills.name}
            value={formData.formControll.skills.value}
            onChange={changeHandler}
            isTouched={formData.formControll.skills.isTouched}
            isError={formData.formControll.skills.isError}
            errMsg={formData.formControll.skills.errMsg}
            label="Skills"
          />
          <Input
            type="text"
            name={formData.formControll.location.name}
            value={formData.formControll.location.value}
            onChange={changeHandler}
            isTouched={formData.formControll.location.isTouched}
            isError={formData.formControll.location.isError}
            errMsg={formData.formControll.location.errMsg}
            label="Location"
          />
          <Input
            type="text"
            name={formData.formControll.company.name}
            value={formData.formControll.company.value}
            onChange={changeHandler}
            isTouched={formData.formControll.company.isTouched}
            isError={formData.formControll.company.isError}
            errMsg={formData.formControll.company.errMsg}
            label="Company"
          />
          <Input
            type="text"
            name={formData.formControll.website.name}
            value={formData.formControll.website.value}
            onChange={changeHandler}
            isTouched={formData.formControll.website.isTouched}
            isError={formData.formControll.website.isError}
            errMsg={formData.formControll.website.errMsg}
            label="Website"
          />
          <Input
            type="text"
            name={formData.formControll.facebook.name}
            value={formData.formControll.facebook.value}
            onChange={changeHandler}
            isTouched={formData.formControll.facebook.isTouched}
            isError={formData.formControll.facebook.isError}
            errMsg={formData.formControll.facebook.errMsg}
            label="Facebook"
          />
          <Input
            type="text"
            name={formData.formControll.twitter.name}
            value={formData.formControll.twitter.value}
            onChange={changeHandler}
            isTouched={formData.formControll.twitter.isTouched}
            isError={formData.formControll.twitter.isError}
            errMsg={formData.formControll.twitter.errMsg}
            label="Twitter"
          />
          <Input
            type="text"
            name={formData.formControll.instagram.name}
            value={formData.formControll.instagram.value}
            onChange={changeHandler}
            isTouched={formData.formControll.instagram.isTouched}
            isError={formData.formControll.instagram.isError}
            errMsg={formData.formControll.instagram.errMsg}
            label="Instagram"
          />
          <Button
            disabled={!formData.isFormVaid}
            btnClass="success btn-block"
            type="submit"
          >
            Update Profile
          </Button>
        </form>
      </Card>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps)(withRouter(AddProfileDetails));
