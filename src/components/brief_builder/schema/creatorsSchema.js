import * as Yup from "yup";

export const creatorsSchema = Yup.object().shape({
  country: Yup.array()
    .required("At least one country must be selected")
    .min(1, "At least one country must be selected"),
  gender: Yup.array()
    .required("Gender required")
    .min(1, "At least one gender must be selected"),
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
