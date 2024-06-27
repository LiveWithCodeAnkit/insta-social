import * as Yup from "yup";

const phoneRules = /^(\+)?(\(?\d+\)?)(([\s-]+)?(\d+)){0,}$/g;
export const settingFormSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  gender: Yup.string()
    .required("Gender is required")
    .notOneOf([" "], "Gender is required"),
  language: Yup.string()
    .required("Language is required")
    .notOneOf([" "], "Language is required"),
  instagramUserName: Yup.string().required("Instagram username is required"),
  tiktokUserName: Yup.string().required("TikTok username is required"),
  dob: Yup.date()
    .required("DOB is required")
    .typeError("Invalid!")
    .min(new Date().getFullYear() - 35, "Must be at least 35 years old")
    .max(new Date().getFullYear() - 19, "Must be at most 19 years old"),
  email: Yup.string(),
  phone: Yup.string()
    .matches(phoneRules, { message: "Phone number is required" })
    .required("Phone number is required"),
  address1: Yup.string().required("Address 1 is required"),
  address2: Yup.string().required("Address 2 is required"),
  cityName: Yup.string().required("City name is required"),
  stateName: Yup.string().required("State name is required"),
  postalCode: Yup.string().required("Postal code is required"),
  countryName: Yup.object().shape({
    label: Yup.string().required("Country name is required"),
    value: Yup.string().required("Country name is required")
  })
});
