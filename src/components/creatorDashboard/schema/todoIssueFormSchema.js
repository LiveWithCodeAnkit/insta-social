import * as Yup from "yup";

export const todoIssueFormSchema = Yup.object().shape({
    campaignsName: Yup.string().required("Compaign name is required"),
    issueInfo: Yup.string().required("Issue info is required"),
    issueType: Yup.string().required("Issue Type is required"),
});
