import * as Yup from "yup";

export const contentFormSchema = Yup.object().shape({
  messaging: Yup.string()
    .required("Messaging required")
    .min(2, "Messaging must be at least 200 characters"),
  hooks: Yup.string()
    .required("Hoks required")
    .min(2, "Hooks must be at least 200 characters"),
  doDes: Yup.string()
    .required("Do  required")
    .min(2, "Do  must be at least 200 characters"),
  doNotDes: Yup.string()
    .required("Don`t  required")
    .min(2, "Don`t  must be at least 200 characters"),
});
