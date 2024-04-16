import { timingFormSchema, timingFormSchemaOne } from "../schema";
import { useDispatch, useSelector } from "react-redux";
import { createCampaign } from "../../../../store/brief_builder/campaign/campaign.slice";
import { useState } from "react";

export const useTimingForm = ({ handleTab, campaignData }) => {
  const infoCam = useSelector(
    (state) => state.Campaign.addCampaignDetails?.campaign
  );
  const [loading, setLoading] = useState(false);

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

  const handleTimingForm = async (values) => {
    setLoading(true);
    const valuesInUTC = {
      creatorsReadyToReview: convertToUTC(values.creatorsReadyToReview),
      productShipped: convertToUTC(values.productShipped),
      contentSubmitted: convertToUTC(values.contentSubmitted),
      fromDate: convertToUTC(values.fromDate),
      toDate: convertToUTC(values.toDate),
    };

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
    const res = await dispatch(createCampaign(formData));

    if (res.payload?.success) {
      handleTab(7);
    }
    setLoading(false);
  };

  return {
    initialValues,
    loading,
    schema: campaignData?.campaignDetails?.permissionRequired
      ? timingFormSchema
      : timingFormSchemaOne,
    submit: handleTimingForm,
  };
};
