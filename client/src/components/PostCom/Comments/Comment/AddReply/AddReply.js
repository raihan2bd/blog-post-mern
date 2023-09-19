import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as actions from "../../../../../redux/post/actions";

import { validateForm } from "../../../../../utils/formvalidator";

import Input from "../../../../UI/Input/Input";
import Button from "../../../../UI/Button/Button";

import "./AddReply.css";

const AddReply = ({
  comId,
  post,
  onAddCommentReplay,
  handleShowAddReplay,
  editing,
  toggleEditing,
  reply,
  onEditCommentReply,
  history,
  isAuth
}) => {
  const [formData, setFormData] = useState({
    formControl: {
      replyText: {
        type: "text",
        label: "Reply",
        name: "replyText",
        value: "",
        isError: false,
        errMsg: "",
        isTouched: false,
        config: {
          isRequired: true,
          isMinLength: 2,
          isMaxLength: 255,
          isString: true
        }
      }
    },
    isFormValid: false
  });
  const [edited, setEdited] = useState(false);

  useEffect(() => {
    if (!isAuth) {
      return history.push("/login");
    } else if (editing && !edited) {
      const newFormData = {
        ...formData,
        isFormValid: true,
        formControl: {
          ...formData.formControl,
          replyText: {
            ...formData.formControl.replyText,
            value: reply.text
          }
        }
      };
      setFormData({ ...newFormData });
      setEdited(true);
    }
  }, [editing, formData, edited, reply, history, isAuth]);

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
      isFormValid: !newFormData.formControl[name].isError
    });
  };

  const submitForm = async e => {
    e.preventDefault();
    if (
      formData.formControl.replyText.value.length > 1 &&
      formData.isFormValid
    ) {
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
            `/api/posts/comments/reply/${post._id}/${comId}/${reply._id}`,
            { text: formData.formControl.replyText.value },
            config
          );
          await onEditCommentReply(comId, res.data.reply);
          toggleEditing();
        } catch (err) {
          console.log(err.response);
        }
      } else {
        onAddCommentReplay(
          post._id,
          comId,
          formData.formControl.replyText.value
        );
        handleShowAddReplay();
      }
    }
  };
  return (
    <div className={editing ? "add-replay popup-edit-reply" : "add-replay"}>
      {editing ? (
        <Button
          btnClass="danger p7"
          style={{ position: "absolute", top: "0", right: "0" }}
          onClick={toggleEditing}
        >
          X
        </Button>
      ) : null}

      <form onSubmit={submitForm}>
        <Input
          type={formData.formControl.replyText.type}
          name={formData.formControl.replyText.name}
          id={formData.formControl.replyText.name}
          label={formData.formControl.replyText.label}
          value={formData.formControl.replyText.value}
          onChange={handleChange}
          isError={formData.formControl.replyText.isError}
          isTouched={formData.formControl.replyText.isTouched}
          errMsg={formData.formControl.replyText.errMsg}
        />
        <Button disabled={!formData.isFormValid} btnClass="success btn-block">
          {editing ? "Update Reply" : "Add Reply"}
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  post: state.post.post,
  isAuth: state.auth.isAuth
});

const mapDispatchToProps = dispatch => ({
  onAddCommentReplay: (postId, comId, replyText) =>
    dispatch(actions.addCommentReplay(postId, comId, replyText)),
  onEditCommentReply: (comId, reply) =>
    dispatch(actions.editCommentReplySuccess(comId, reply))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddReply));
