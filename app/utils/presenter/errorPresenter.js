export const errorProducts = (data, status, body, type) => {
  const { code, details } = data;
  const fields = ["name", "description", "characteristics", "price", "taxes"];

  let res = {};
  fields.forEach(field => {
    if (details.error[field]) {
      res = {
        type,
        error: {
          code: status,
          type: code,
          detail: details.errors[field].message,
          errors: details.errors,
          formErrors: details.errors
        },
        body
      };
    }
  });

  return res;
};

export const errorEmployments = (data, status, body, type) => {
  const { code, details } = data.errors;
  const fields = ["name", "surname", "roles", "email", "username"];

  let res = {};
  fields.forEach(field => {
    if (details.errors[field]) {
      res = {
        type,
        error: {
          code: status,
          type: code,
          detail: details.errors[field].message,
          errors: details.errors,
          formErrors: details.errors
        },
        body
      };
    }
  });

  return res;
};

export const errorUserPassword = (data, status, type) => {
  const { code, details } = data.errors;
  const fields = ["oldPassword", "newPassword", "newPasswordConfirmation"];

  let res = {};
  fields.forEach(field => {
    if (details.errors[field]) {
      res = {
        type,
        error: {
          code: status,
          type: code,
          detail: details.errors[field].message,
          errors: details.errors
        }
      };
    }
  });

  return res;
};
