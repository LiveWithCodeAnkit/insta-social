import * as Yup from "yup";

export const brandFormSchema = Yup.object().shape({
  brandName: Yup.string()
    .required("Brand name required")
    .matches(/^[A-Za-z ]*$/, "Please enter valid name"),
  brandWebsite: Yup.string().required("Brand website required"),
  brandInstagram: Yup.string().required("Brand instagram required"),
  brandTiktok: Yup.string().required("Brand tiktok required"),
  brandDescription: Yup.string()
    .required("Brand Description required")
    .min(15, "Brand Description must be at least 15 characters"),
  fileUpload: Yup.mixed().required("File is required"),
});
