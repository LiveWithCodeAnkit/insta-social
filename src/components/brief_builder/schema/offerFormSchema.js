import * as Yup from "yup";

export const offerFormSchema = Yup.object().shape({
  gifts: Yup.array().of(
    Yup.object().shape({
      offerImage: Yup.mixed()
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

      productName: Yup.string().required("Product name is required"),
      description: Yup.string()
        .required("Product description is required")
        .min(20, "Product description must be at least 20 characters"),
      productLink: Yup.string().matches(
        /^(?!.*\s)(?:https?:\/\/)?(?:www\.)?[^.\s]+\.[^\s]{2,}(?:\.[^\s]{2,})?$/,
        "Invalid URL format"
      ),
      unitsPerCreator: Yup.string()
        .required("Number of units per creator is required")
        .matches(/^\d+$/, "Please enter only digits for units per creator"),
      variants: Yup.array().of(
        Yup.object().shape({
          variantType: Yup.array().min(
            1,
            "At least one variant type is required"
          ),
          variantDes: Yup.string(),
        })
      ),
    })
  ),
});

export const paidSchema = Yup.object().shape({
  isSampleRequired: Yup.boolean().required(),
  offerPrice: Yup.string(),
});
