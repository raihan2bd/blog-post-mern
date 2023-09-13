export const validateForm = (rules, name, value) => {
  let isValid = true;
  let isError = false;
  let errMsg = "";
  if (!rules) {
    isError = false;
  }
  if (rules.isRequired !== "undefined") {
    if (name === "images") {
      isValid = value.length !== 0 && isValid;
    } else {
      isValid = value.trim() !== "" && isValid;
    }
    if (!isValid) {
      isError = true;
      errMsg = `${name} is Required`;
    }
  }
  if (rules.isMinLength) {
    isValid = value.length >= rules.isMinLength && isValid;
    if (!isValid) {
      isError = true;
      errMsg = `${name} must be at least ${rules.isMinLength} character logn`;
    }
  }

  if (rules.isMinWord) {
    isValid = value.split(",");
    if (isValid.length <= rules.isMinWord) {
      isError = true;
      errMsg = `${name} must be at least 5 to 25 word long and seperate your tags word by comma(,)`;
    }
  }

  if (rules.isMaxWord) {
    isValid = value.split(",");
    if (isValid.length <= rules.isMinWord) {
      isError = true;
      errMsg = `${name} must be at least 5 to 25 word long and seperate your tags word by comma(,)`;
    }
  }

  if (rules.isEmail) {
    var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    isValid = re.test(String(value).toLowerCase());
    if (!isValid) {
      isError = true;
      errMsg = `Enter a valid E-mail address`;
    }
  }

  if (rules.isSelected) {
    isValid = value === "Default";
    if (isValid) {
      isError = true;
      errMsg = `You must select a ${name}`;
    }
  }
  if (rules.isRequired) {
    return {
      isError,
      errMsg,
      isValid: !isError
    };
  } else {
    return {
      isError,
      errMsg
    };
  }
};

export const checkPassword = (pass, confirmPass) => {
  let isError = false;
  let errMsg = "";
  if (pass !== confirmPass) {
    isError = true;
    errMsg = "Password and Confirm Password does not match";
  }
  return {
    isError,
    errMsg,
    isValid: !isError
  };
};

// export const checkIsFormVaid = config;
