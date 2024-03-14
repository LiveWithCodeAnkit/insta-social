import { timingFormSchema } from "../schema";

export const useTimingForm = () => {
  const initialValues = {
    creatorsReadyToReview: null,
    productShipped: null,
    contentSubmitted: null,
    fromDate: null,
    toDate: null,
  };

  const handleTimingForm = (values) => {
    console.log("TimingForm values -:", values);
  };

  return {
    initialValues,
    schema: timingFormSchema,
    submit: handleTimingForm,
  };
};
