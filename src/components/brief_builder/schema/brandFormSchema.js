import * as Yup from "yup";

export const brandFormSchema = Yup.object().shape({
  brandName: Yup.string()
    .required("Brand name required")
    .matches(/^[A-Za-z ]*$/, "Please enter valid name"),
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
  fileUpload: Yup.mixed()
    .required("File is required")
    .test(
      "fileType",
      "Unsupported file format. Only JPG, GIF, PNG, and JPEG are allowed.",
      (value) => {
        if (!value || !value.length) return false; // if no file is uploaded, return false
        const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
        return value.every((file) => {
          const extension = file.path.split(".").pop().toLowerCase();
          return allowedExtensions.includes(extension);
        });
      }
    ),
});
