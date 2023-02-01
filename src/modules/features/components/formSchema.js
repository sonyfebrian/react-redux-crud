import * as yup from "yup";

export const registerSchema = yup.object().shape({
  email: yup
    .string("email should be a string")
    .email("please provide a valid email address")
    .required("Email address is required"),
  password: yup
    .string("password should be a string")
    .required("Password Required")
    .min(6, "Password must be 6 characters long")
    .test(
      "isValidPass",
      "Password must be 6 char (One UpperCase & One Symbol)",
      (value, context) => {
        const hasUpperCase = /[A-Z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasSymbole = /["!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"]/.test(value);
        let validConditions = 0;
        const numberOfMustBeValidConditions = 3;
        const conditions = [hasUpperCase, hasLowerCase, hasNumber, hasSymbole];
        conditions.forEach((condition) =>
          condition ? validConditions++ : null
        );
        if (validConditions >= numberOfMustBeValidConditions) {
          return true;
        }
        return false;
      }
    ),
  currentPassword: yup
    .string("")
    .required("Confirm Password Required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  username: yup.string("").required("Username is required"),
  firstname: yup.string("").required("First Name is required"),
  lastname: yup.string("").required("Last Name is required"),
  expiredDate: yup.string("").required("Expired Date is required"),
  groupAccess: yup
    .object()
    .shape({
      label: yup.string().required("status is required (from label)"),
      value: yup.string().required("status is required"),
    })
    .nullable() // for handling null value when clearing options via clicking "x"
    .required("Group Access is required"),
});
