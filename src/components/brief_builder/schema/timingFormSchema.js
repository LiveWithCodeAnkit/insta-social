import * as Yup from "yup";

export const timingFormSchema = Yup.object().shape({
  creatorsReadyToReview: Yup.date().required(
    "Creators Ready to Review is required"
  ),
  productShipped: Yup.date().required("Product Shipped is required"),
  contentSubmitted: Yup.date().required(
    "Content Submitted for Approval is required"
  ),
  fromDate: Yup.date().required("From Date is required"),
  toDate: Yup.date().required("To Date is required"),
});
