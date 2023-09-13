import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

import { validateForm } from "../../../utils/formvalidator";

import Card from "../../UI/Card/Card";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import Spinner from "../../UI/Spinner/Spinner";

const AddPost = ({ history }) => {
  const [formData, setFormData] = useState({
    formControl: {
      title: {
        type: "text",
        value: "",
        name: "title",
        label: "Title",
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
      content: {
        type: "textarea",
        value: "",
        name: "content",
        label: "Content",
        config: {
          isRequired: true,
          isMinLength: 50,
          isMaxLength: 1000,
          isString: true
        },
        isTouched: false,
        errMsg: "",
        isError: false
      },
      thumbnail: {
        type: "file",
        value: "",
        name: "thumbnail",
        file: "",
        config: {
          isRequired: true
        },
        isTouched: false,
        errMsg: "",
        isError: false
      },
      cat: {
        type: "select",
        value: "Default",
        name: "cat",
        label: "Category",
        options: [],
        config: {
          isRequired: true,
          isSelected: true
        },
        isTouched: false,
        errMsg: "",
        isError: false
      },
      tags: {
        type: "text",
        value: "",
        name: "tags",
        label: "Tags",
        config: {
          isRequired: true,
          isMinWord: 4,
          isMaxWord: 25
        },
        isTouched: false,
        errMsg: "",
        isError: false
      }
    },
    isFormVaid: false
  });
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCats = () => {
      axios
        .get("/api/posts/categories")
        .then(res => {
          setOptions(res.data);
        })
        .catch(err => {
          console.log(err.response);
        });
    };
    loadCats();
  }, []);

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
    setFormData({ ...newFormData, isFormVaid: isInputsValid });
  }; //end handleChange

  const handleClick = e => {
    handleChange(e);
  };

  const handleSubmit = e => {
    e.preventDefault();
    let myFormData = new FormData();
    myFormData.set("title", formData.formControl.title.value);
    myFormData.set("content", formData.formControl.content.value);
    myFormData.append("thumbnail", formData.formControl.thumbnail.file);
    myFormData.set("tags", formData.formControl.tags.value);
    myFormData.set("catId", formData.formControl.cat.value);
    // let myFormData = {
    //   title: formData.formControl.title.value,
    //   content: formData.formControl.content.value,
    //   catId: formData.formControl.cat.value
    // };
    let token = localStorage.getItem("token");
    if (token) {
      token = JSON.parse(token);
    }
    setLoading(true);
    axios
      .post("/api/posts/", myFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": token
        }
      })

      .then(res => {
        setLoading(false);
        return res.data.post;
      })
      .then(post => {
        history.push(`/posts/${post._id}`);
      })
      .catch(err => {
        setLoading(false);
        console.log(err.response);
      });
  };

  let myContent = "";

  if (loading) {
    myContent = <Spinner></Spinner>;
  }

  return (
    <div className="add-posts">
      {myContent}
      <Card>
        <h3>Create A posts</h3>
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
            onClick={handleClick}
          />
          <Input
            type="select"
            placeholder="Enter title here"
            name="cat"
            label="Category"
            options={options}
            onChange={handleChange}
            value={formData.formControl.cat.value}
            isError={formData.formControl.cat.isError}
            errMsg={formData.formControl.cat.errMsg}
            onClick={handleClick}
          />
          <Input
            type="textarea"
            placeholder="Enter Post Content here"
            name="content"
            label="Content"
            onChange={handleChange}
            value={formData.formControl.content.value}
            isError={formData.formControl.content.isError}
            errMsg={formData.formControl.content.errMsg}
            onClick={handleClick}
          />
          <Input
            type="text"
            placeholder="Enter Tags here"
            name="tags"
            label="Tags"
            onChange={handleChange}
            value={formData.formControl.tags.value}
            isError={formData.formControl.tags.isError}
            errMsg={formData.formControl.tags.errMsg}
            onClick={handleClick}
          />
          <Input
            type="file"
            name="thumbnail"
            accept="image/png, image/jpeg"
            label="Thumbnail"
            onChange={handleChange}
            isError={formData.formControl.thumbnail.isError}
            errMsg={formData.formControl.thumbnail.errMsg}
            onClick={handleClick}
            value={formData.formControl.thumbnail.value}
          />
          <Button disabled={!formData.isFormVaid || loading} btnClass="success">
            Create Post
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default withRouter(AddPost);
