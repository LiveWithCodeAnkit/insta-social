import * as Yup from "yup";

export const settingFormSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    gender: Yup.string().required("Gender is required"),
    language: Yup.string().required("Language is required"),
    instagramUserName: Yup.string().required("Instagram username is required"),
    tiktokUserName: Yup.string().required("TikTok username is required"),
    dob: Yup.date().required("DOB is required")
        // .min(new Date().getFullYear() - 35, "Must be at least 35 years old")
        .max(new Date().getFullYear() - 19, "Must be at most 19 years old"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    address1: Yup.string().required("Address is required"),
    address2: Yup.string().required("Address 2 is required"),
    cityName: Yup.string().required("City name is required"),
    stateName: Yup.string().required("State name is required"),
    postalCode: Yup.string().required("Postal code is required"),
    countryName: Yup.string().required("Country name is required"),
});
