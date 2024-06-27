import { paidSchema } from "../schema";
import { useDispatch, useSelector } from "react-redux";
import {
  createCampaign,
  getCampaignbyId,
} from "../../../../store/brief_builder/campaign/campaign.slice";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export const usePaidFrom = ({ handleTab, handleTabInside }) => {
  const infoCam = useSelector(
    (state) => state.Campaign.addCampaignDetails?.campaign
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { brief_builder } = useParams();
  const campaignData = useSelector(
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

  const paidOffers = campaignData?.offerDetails?.filter(
    (offer) => offer.offerType === "PAID"
  );

  const initialValues = {
    _id: paidOffers?._id,
    offerType: "PAID",
    offerPrice: paidOffers?.[0]?.offerPrice || "100",
    isSampleRequired: campaignData?.campaignDetails?.isSampleRequired || false,
  };
  const campaignId = infoCam?._id || (brief_builder && brief_builder[0]);

  const handlePaidForm = async (values) => {
    const formData = new FormData();
    setLoading(true);

    const offerDetails = {
      offerDetails: {
        campaignId: campaignId,
        offers: [
          {
            ...(paidOffers && { _id: paidOffers?.[0]?._id }),
            offerType: "PAID",
            offerPrice: values.offerPrice,
          },
        ],
      },
      campaignDetails: {
        campaignId: campaignId,
        details: {
          isSampleRequired: values.isSampleRequired,
        },
      },
    };

    formData.append("data", JSON.stringify(offerDetails));
    // formData.append("data", JSON.stringify(campaignDetails));
    const res = await dispatch(createCampaign(formData));
    if (res.payload?.success) {
      handleTab(3);
      // handleChange(event, 1);
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
