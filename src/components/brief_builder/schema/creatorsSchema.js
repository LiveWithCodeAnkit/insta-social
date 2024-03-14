import * as Yup from "yup";

export const creatorsSchema = Yup.object().shape({
  country: Yup.string().required("Country required"),
  gender: Yup.string()
    .required("Gender required")
    .oneOf(["MALE", "FEMALE", "OTHERS"], "Invalid gender value"),
  age: Yup.array()
    .required("Age required")
    .of(
      Yup.number()
        .typeError("Age must be a valid number")
        .integer("Age must be a whole number")
        .min(18, "Age must be at least 18")
        .max(35, "Age must not exceed 35")
    ),
});
