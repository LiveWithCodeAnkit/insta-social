import * as Yup from "yup";

export const timingFormSchema = Yup.object().shape({
  creatorsReadyToReview: Yup.date()
    .required("Creators Ready to Review is required")
    .typeError("Invalid!")
    .min(
      new Date(new Date().setHours(0, 0, 0, 0)),
      "Creators Ready to Review must be on or after current date"
    ),

  productShipped: Yup.date()
    .required("Product Shipped is required")
    .typeError("Invalid!")
    .test({
      name: "to-date-after-from-date",
      exclusive: false,
      message: "Product Shipped must be on or after Creators Ready to Review",
      test: function (value) {
        const fromDate = this.resolve(Yup.ref("creatorsReadyToReview"));
        const fromDateMidnight = new Date(fromDate.setHours(0, 0, 0, 0));

        const toDate = new Date(value.setHours(0, 0, 0, 0));

        return toDate >= fromDateMidnight;
      },
    })
    .min(
      new Date(new Date().setHours(0, 0, 0, 0)),
      "Creators Ready to Review must be on or after current date"
    ),

  contentSubmitted: Yup.date()
    .required("Content Submitted for Approval is required")
    .typeError("Invalid!")
    .test({
      name: "to-date-after-from-date",
      exclusive: false,
      message: "Content Submitted must be on or after Product Shipped",
      test: function (value) {
        const fromDate = this.resolve(Yup.ref("productShipped"));
        const fromDateMidnight = new Date(fromDate.setHours(0, 0, 0, 0));

        const toDate = new Date(value.setHours(0, 0, 0, 0));

        return toDate >= fromDateMidnight;
      },
    })
    .min(
      new Date(new Date().setHours(0, 0, 0, 0)),
      "Creators Ready to Review must be on or after current date"
    ),

  fromDate: Yup.date()
    .required("From Date is required")
    .typeError("Invalid!")
    .test({
      name: "to-date-after-from-date",
      exclusive: false,
      message: "From Date must be on or after Content Submitted",
      test: function (value) {
        const fromDate = this.resolve(Yup.ref("contentSubmitted"));
        const fromDateMidnight = new Date(fromDate.setHours(0, 0, 0, 0));

        const toDate = new Date(value.setHours(0, 0, 0, 0));

        return toDate >= fromDateMidnight;
      },
    })
    .min(
      new Date(new Date().setHours(0, 0, 0, 0)),
      "Creators Ready to Review must be on or after current date"
    ),
  toDate: Yup.date()
    .required("To Date is required")
    .typeError("Invalid!")
    .test({
      name: "to-date-after-from-date",
      exclusive: false,
      message: "To Date must be on or after From Date",
      test: function (value) {
        const fromDate = this.resolve(Yup.ref("fromDate"));
        const fromDateMidnight = new Date(fromDate.setHours(0, 0, 0, 0));

        const toDate = new Date(value.setHours(0, 0, 0, 0));

        return toDate >= fromDateMidnight;
      },
    })
    .min(
      new Date(new Date().setHours(0, 0, 0, 0)),
      "To Date must be on or after the current date"
    ),
});

export const timingFormSchemaOne = Yup.object().shape({
  creatorsReadyToReview: Yup.date()
    .required("Creators Ready to Review is required")
    .typeError("Invalid!")
    .min(
      new Date(new Date().setHours(0, 0, 0, 0)),
      "Creators Ready to Review must be on or after current date"
    ),

  productShipped: Yup.date()
    .required("Product Shipped is required")
    .typeError("Invalid!")
    .test({
      name: "to-date-after-from-date",
      exclusive: false,
      message: "Product Shipped must be on or after Creators Ready to Review",
      test: function (value) {
        const fromDate = this.resolve(Yup.ref("creatorsReadyToReview"));
        const fromDateMidnight = new Date(fromDate.setHours(0, 0, 0, 0));

        const toDate = new Date(value.setHours(0, 0, 0, 0));

        return toDate >= fromDateMidnight;
      },
    })
    .min(
      new Date(new Date().setHours(0, 0, 0, 0)),
      "Creators Ready to Review must be on or after current date"
    ),

  fromDate: Yup.date()
    .required("From Date is required")
    .typeError("Invalid!")
    .test({
      name: "to-date-after-from-date",
      exclusive: false,
      message: "From Date must be on or after Content Submitted",
      test: function (value) {
        const fromDate = this.resolve(Yup.ref("productShipped"));
        const fromDateMidnight = new Date(fromDate.setHours(0, 0, 0, 0));

        const toDate = new Date(value.setHours(0, 0, 0, 0));

        return toDate >= fromDateMidnight;
      },
    })
    .min(
      new Date(new Date().setHours(0, 0, 0, 0)),
      "Creators Ready to Review must be on or after current date"
    ),
  toDate: Yup.date()
    .required("To Date is required")
    .typeError("Invalid!")
    .test({
      name: "to-date-after-from-date",
      exclusive: false,
      message: "To Date must be on or after From Date",
      test: function (value) {
        const fromDate = this.resolve(Yup.ref("fromDate"));
        const fromDateMidnight = new Date(fromDate.setHours(0, 0, 0, 0));

        const toDate = new Date(value.setHours(0, 0, 0, 0));

        return toDate >= fromDateMidnight;
      },
    })
    .min(
      new Date(new Date().setHours(0, 0, 0, 0)),
      "To Date must be on or after the current date"
    ),
});
