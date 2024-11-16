export const VALID_EMAIL = {
  required: "Email Is Required",
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Email is not valid",
  },
};
export const VALID_PASSWORD = {
  required: "password Is Required",
};
