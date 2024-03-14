import * as Yup from "yup";

export const offerFormSchema = Yup.object().shape({
  productName: Yup.string()
    .required("Product name is required")
    .matches(/^[A-Za-z ]*$/, "Please enter a valid product name"),
  productDes: Yup.string()
    .required("Product description is required")
    .min(5, "Product description must be at least 200 characters"),
  productUrl: Yup.string().url("Please enter a valid URL for the product"),
  unitsPerCreator: Yup.string().required(
    "Number of units per creator is required"
  ),
  variants: Yup.array().of(
    Yup.object().shape({
      variant: Yup.string().required("Variant is required"),
      variantValue: Yup.string().required("Variant Value is required"),
    })
  ),
});
