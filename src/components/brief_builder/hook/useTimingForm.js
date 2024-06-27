import { timingFormSchema, timingFormSchemaOne } from "../schema";
import { useDispatch, useSelector } from "react-redux";
import {
  createCampaign,
  getCampaignbyId,
} from "../../../../store/brief_builder/campaign/campaign.slice";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export const useTimingForm = ({ handleTab }) => {
  const dispatch = useDispatch();
  const infoCam = useSelector(
    (state) => state.Campaign.addCampaignDetails?.campaign
  );
  const [loading, setLoading] = useState(false);
  const { brief_builder } = useParams();

  const campaignDatainfo = useSelector(
    (state) => state.Campaign.getCampaignbyId.campaignData
  );

  useEffect(() => {
    if (infoCam?._id) {
      dispatch(getCampaignbyId({ campaignId: infoCam._id }));
    }
  }, [dispatch, infoCam?._id]);

  useEffect(() => {
    if (brief_builder && brief_builder.length > 0) {
      dispatch(getCampaignbyId({ campaignId: brief_builder[0] }));
    }
  }, [dispatch, brief_builder]);

  const initialValues = {
    creatorsReadyToReview:
      campaignDatainfo?.campaignDetails?.readyToReviewDate || null,
    productShipped: campaignDatainfo?.campaignDetails?.shippingDate || null,
    contentSubmitted:
      campaignDatainfo?.campaignDetails?.contentUploadDeadline || null,
    fromDate:
      campaignDatainfo?.campaignDetails?.contentPostingDate?.minDate || null,
    toDate:
      campaignDatainfo?.campaignDetails?.contentPostingDate?.maxDate || null,
  };

  const convertToUTC = (date) => {
    if (date) {
      return new Date(date).toISOString();
    }
    return null;
  };

  const campaignId = infoCam?._id || (brief_builder && brief_builder[0]);

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
        campaignId: campaignId,
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
    schema: timingFormSchema,
    submit: handleTimingForm,
  };
};
