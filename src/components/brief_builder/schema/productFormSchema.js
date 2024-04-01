import * as Yup from "yup";

export const productFormSchema = Yup.object().shape({
  products: Yup.array().of(
    Yup.object().shape({
      description: Yup.string()
        .required("Product description is required")
        .min(5, "Product description must be at least 200 characters"),
    })
  ),
});
