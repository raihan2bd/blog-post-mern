import React from "react";

import "./Input.css";

const Input = ({
  label,
  type,
  handleChange,
  isError,
  errMsg,
  isTouched,
  options,
  inpClass,
  ...otherProps
}) => {
  let placeholder = "";
  if (label) {
    placeholder = `Enter your ${label} here..`;
  }
  let success;

  if (isTouched && !isError) {
    success = <span className="input-success">&#9673;</span>;
  }
  let myOptions;
  if (options) {
    myOptions = options.map(i => {
      return (
        <option key={i._id} value={i._id}>
          {i.title}
        </option>
      );
    });
  }

  let myInput = "";
  if (type === "select") {
    myInput = (
      <select
        className={inpClass ? ["form-input", inpClass].join(" ") : "form-input"}
        defaultValue={otherProps.value}
        name={otherProps.name}
        onChange={otherProps.onChange}
        onClick={otherProps.onClick}
      >
        <option value="Default" disabled>
          Select Category
        </option>
        {myOptions}
      </select>
    );
  } else if (type === "textarea") {
    myInput = (
      <textarea
        className={
          inpClass ? ["input-textarea", inpClass].join(" ") : "input-textarea"
        }
        value={otherProps.value}
        name={otherProps.name}
        onChange={otherProps.onChange}
        {...otherProps}
      ></textarea>
    );
  } else {
    myInput = (
      <input
        className={inpClass ? ["form-input", inpClass].join(" ") : "form-input"}
        onChange={handleChange}
        placeholder={placeholder}
        type={type}
        {...otherProps}
      />
    );
  }

  return (
    <div className="form-group">
      <label className="form-label">
        {label}:{" "}
        {isError ? <span className="input-error">{errMsg}</span> : null}
        {success}
      </label>
      {myInput}
      <div className="input-border"></div>
    </div>
  );
};

export default Input;
