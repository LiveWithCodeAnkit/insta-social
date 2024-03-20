import { timingFormSchema } from "../schema";
import { useDispatch, useSelector } from "react-redux";
import { createCampaign } from "../../../../store/brief_builder/campaign/campaign.slice";

export const useTimingForm = () => {
  const infoCam = useSelector(
    (state) => state.Campaign.addCampaignDetails?.campaign
  );
  const dispatch = useDispatch();
  const initialValues = {
    creatorsReadyToReview: null,
    productShipped: null,
    contentSubmitted: null,
    fromDate: null,
    toDate: null,
  };

  const convertToUTC = (date) => {
    if (date) {
      return new Date(date).toISOString();
    }
    return null;
  };

  const handleTimingForm = (values) => {
    const valuesInUTC = {
      creatorsReadyToReview: convertToUTC(values.creatorsReadyToReview),
      productShipped: convertToUTC(values.productShipped),
      contentSubmitted: convertToUTC(values.contentSubmitted),
      fromDate: convertToUTC(values.fromDate),
      toDate: convertToUTC(values.toDate),
    };

    // console.log("TimingForm values -:", valuesInUTC);

    // Use valuesInUTC as needed
    const {
      creatorsReadyToReview,
      productShipped,
      contentSubmitted,
      fromDate,
      toDate,
    } = valuesInUTC;
    const formData = new FormData();

    const campaignDetails = {
      campaignDetails: {
        campaignId: infoCam?._id,
        details: {
          readyToReviewDate: creatorsReadyToReview,
          shippingDate: productShipped,
          contentUploadDeadline: contentSubmitted,
          contentPostingDate: {
            minDate: fromDate,
            maxDate: toDate,
          },
        },
      },
    };
    formData.append("data", JSON.stringify(campaignDetails));
    dispatch(createCampaign(formData));
  };

  return {
    initialValues,
    schema: timingFormSchema,
    submit: handleTimingForm,
  };
};
