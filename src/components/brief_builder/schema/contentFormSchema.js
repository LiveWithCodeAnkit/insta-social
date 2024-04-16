import * as Yup from "yup";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const contentFormSchema = Yup.object().shape({
  campaignName: Yup.string().required("Campaign name required"),
  messaging: Yup.string()
    .required("Messaging required")
    .min(22, "Messaging must be at least 15 characters"),
  hooks: Yup.string()
    .required("Hooks required")
    .min(22, "Hooks must be at least 15 characters"),
  doDes: Yup.string()
    .required("Do  required")
    .min(22, "Do  must be at least 15 characters"),
  doNotDes: Yup.string()
    .required("Don`t  required")
    .min(22, "Don`t  must be at least 15 characters"),
  images: Yup.array()
    .min(1, "Images required")
    .max(5, "Max 5 files You can Upload"),
  externalLinks: Yup.array()
    .of(
      Yup.string().matches(
        /^(?!.*\s)(?:https?:\/\/)?(?:www\.)?[^.\s]+\.[^\s]{2,}(?:\.[^\s]{2,})?$/,
        "Invalid URL format for Links"
      )
    )
    .required("External links are required"),
});
