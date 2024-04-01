import * as Yup from "yup";

export const uploadContentFormSchema = Yup.object().shape({
    images: Yup.array(),
    captionName: Yup.string()
        .required("Caption Required !"),
});
