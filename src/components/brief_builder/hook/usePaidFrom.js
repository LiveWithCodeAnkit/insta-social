import { paidSchema } from "../schema";
import { useDispatch, useSelector } from "react-redux";
import { createCampaign } from "../../../../store/brief_builder/campaign/campaign.slice";
import { useState } from "react";

export const usePaidFrom = ({ handleTab }) => {
  const infoCam = useSelector(
    (state) => state.Campaign.addCampaignDetails?.campaign
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const initialValues = {
    offerType: "PAID",
    offerPrice: "100",
    isSampleRequired: false,
  };

  const handlePaidForm = async (values) => {
    const formData = new FormData();
    setLoading(true);

    const offerDetails = {
      offerDetails: {
        campaignId: infoCam?._id,
        offers: [
          {
            offerType: "PAID",
            offerPrice: values.offerPrice,
          },
        ],
      },
      campaignDetails: {
        campaignId: infoCam?._id,
        details: {
          permissionRequired: values.isSampleRequired,
        },
      },
    };

    formData.append("data", JSON.stringify(offerDetails));
    // formData.append("data", JSON.stringify(campaignDetails));
    const res = await dispatch(createCampaign(formData));
    if (res.payload?.success) {
      handleTab(3);
    }
    setLoading(false);
  };

  return {
    initialValues,
    loading,
    schema: paidSchema,
    submit: handlePaidForm,
  };
};
