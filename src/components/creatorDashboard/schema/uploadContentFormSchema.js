import * as Yup from "yup";

export const uploadContentFormSchema = Yup.object().shape({
    images: Yup.array().min(1, 'At least one image is required !').required('At least one image is required !'),
    captionName: Yup.string()
        .required("Caption required !"),
});
