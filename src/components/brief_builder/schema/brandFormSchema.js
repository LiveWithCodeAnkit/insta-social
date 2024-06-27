import * as Yup from "yup";

export const brandFormSchema = Yup.object().shape({
  brandName: Yup.string().required("Brand name required"),
  brandWebsite: Yup.string()
    .required("Brand website required")
    .matches(
      /^(?!.*\s)(?:https?:\/\/)?(?:www\.)?[^.\s]+\.[^\s]{2,}(?:\.[^\s]{2,})?$/,
      "Invalid URL format for brand website"
    ),
  brandInstagram: Yup.string(),
  brandTiktok: Yup.string(),
  brandDescription: Yup.string()
    .required("Brand Description required")
    .min(22, "Brand Description must be at least 15 characters"),
  fileUpload: Yup.array().min(1, "Image required"),
});
