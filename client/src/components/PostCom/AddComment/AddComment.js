import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../../redux/post/actions";

import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import { validateForm } from "../../../utils/formvalidator";
import "./AddComment.css";

const AddComment = ({
  postId,
  user,
  isAuth,
  onAddComment,
  comment,
  editing,
  toggleEditing,
  onEditComment,
  comId
}) => {
  const [formData, setFormData] = useState({
    formControl: {
      comment: {
        value: "",
        name: "comment",
        label: "Comment",
        type: "textarea",
        config: {
          isRequired: true,
          isMinLength: 2,
          isMaxLength: 255,
          isString: true
        },
        isTouched: false,
        errMsg: "",
        isError: false
      },
      isFormValid: false
    }
  });
  const [edited, setEdited] = useState(false);

  useEffect(() => {
    if (editing && !edited) {
      const newFormData = {
        ...formData,
        isFormValid: true,
        formControl: {
          ...formData.formControl,
          comment: {
            ...formData.formControl.comment,
            value: comment.text
          }
        }
      };
      setFormData({ ...newFormData });
      setEdited(true);
    }
  }, [editing, edited, formData, comment]);

  const handleChange = e => {
    const { name, value } = e.target;
    const rules = formData.formControl[name].config;
    let newFormData = { ...formData };
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
    setFormData({
      ...newFormData,
      isFormValid: !newFormData.formControl.comment.isError
    });
  };

  const submitFormHandler = async e => {
    e.preventDefault();
    if (editing) {
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
          `/api/posts/comments/${postId}/${comId}`,
          { text: formData.formControl.comment.value },
          config
        );
        await onEditComment(comId, res.data.comment);
        toggleEditing();
        console.log(res.data);
      } catch (err) {
        console.log(err.response);
      }
    } else {
      onAddComment(postId, formData.formControl.comment.value);
      setFormData({
        ...formData,
        isFormValid: false,
        formControl: {
          ...formData.formControl,
          comment: {
            ...formData.formControl.comment,
            value: "",
            isError: false,
            errMsg: "",
            isTouched: false
          }
        }
      });
    }
  };

  let myContent = "";
  if (isAuth) {
    myContent = (
      <form onSubmit={submitFormHandler}>
        <Input
          inpClass="input-add-comment"
          type={formData.formControl.comment.type}
          label={formData.formControl.comment.label}
          name={formData.formControl.comment.name}
          value={formData.formControl.comment.value}
          onChange={handleChange}
          isTouched={formData.formControl.comment.isTouched}
          errMsg={formData.formControl.comment.errMsg}
          isError={formData.formControl.comment.errMsg}
        />
        <Button
          disabled={!formData.isFormValid}
          btnClass="success btn-block btn-custom-add-comment"
        >
          {editing ? "Edit Comment" : "Add Comment"}
        </Button>
      </form>
    );
  } else {
    myContent = (
      <div className="login-to-comment">
        <p>
          If you want to Add a Comment You have to{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    );
  }
  return (
    <div style={{ padding: editing ? "1rem" : "" }} className="add-comment">
      {myContent}
      {editing ? (
        <div className="cancel-edit">
          <Button onClick={toggleEditing} btnClass="danger">
            X
          </Button>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
  isAuth: auth.isAuth
});
const mapDispatchToProps = dispatch => ({
  onAddComment: (postId, commentData) =>
    dispatch(actions.addComment(postId, commentData)),
  onEditComment: (comId, comment) =>
    dispatch(actions.editCommentSuccess(comId, comment))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddComment);
