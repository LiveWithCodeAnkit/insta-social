import * as Yup from "yup";

export const offerFormSchema = Yup.object().shape({
  gifts: Yup.array().of(
    Yup.object().shape({
      offerImage: Yup.array().min(1, "Image required"),
      productName: Yup.string().required("Product name is required"),
      description: Yup.string()
        .required("Product description is required")
        .min(20, "Product description must be at least 20 characters"),

      productLink: Yup.string()
        .nullable()
        .test("is-valid-url", "Invalid URL format", (value) => {
          if (value) {
            const urlRegex =
              /^(?!.*\s)(?:https?:\/\/)?(?:www\.)?[^.\s]+\.[^\s]{2,}(?:\.[^\s]{2,})?$/;
            return urlRegex.test(value);
          }
          return true;
        }),

      variantType: Yup.array()
        .nullable()
        .test(
          "is-valid-array",
          "At least one variant type is required",
          (value) => {
            if (value && value.length > 0) {
              return value.length >= 1;
            }
            return true;
          }
        ),

      variantDes: Yup.string()
        .nullable()
        .test(
          "is-valid-description",
          "Variant description must be at least 20 characters",
          (value) => {
            if (value) {
              return value.length >= 20;
            }
            return true;
          }
        ),
    })
  ),
});

export const paidSchema = Yup.object().shape({
  isSampleRequired: Yup.boolean().required(),
  offerPrice: Yup.string(),
});
