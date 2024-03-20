import * as Yup from "yup";

export const offerFormSchema = Yup.object().shape({
  gifts: Yup.array().of(
    Yup.object().shape({
      productName: Yup.string()
        .required("Product name is required")
        .matches(/^[A-Za-z ]*$/, "Please enter a valid product name"),
      description: Yup.string()
        .required("Product description is required")
        .min(5, "Product description must be at least 200 characters"),
      productLink: Yup.string().required(
        "Please enter a valid URL for the product"
      ),
      unitsPerCreator: Yup.string().required(
        "Number of units per creator is required"
      ),
      variants: Yup.array().of(
        Yup.object().shape({
          variantType: Yup.string(),
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
