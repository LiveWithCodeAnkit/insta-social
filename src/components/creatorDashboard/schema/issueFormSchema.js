import * as Yup from "yup";

export const issueFormSchema = Yup.object().shape({
    link: Yup.string().url("Invalid URL format")
        .required("Links are required!"),
});
