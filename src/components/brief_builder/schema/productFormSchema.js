import * as Yup from "yup";

export const productFormSchema = Yup.object().shape({
  products: Yup.array().of(
    Yup.object().shape({
      productImage: Yup.mixed()
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
      description: Yup.string()
        .required("Product description is required")
        .min(5, "Product description must be at least 200 characters"),
    })
  ),
});
