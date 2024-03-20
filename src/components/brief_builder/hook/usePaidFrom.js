import { paidSchema } from "../schema";
import { useDispatch, useSelector } from "react-redux";
import { createCampaign } from "../../../../store/brief_builder/campaign/campaign.slice";

export const usePaidFrom = ({ handleTab }) => {
  const infoCam = useSelector(
    (state) => state.Campaign.addCampaignDetails?.campaign
  );
  const dispatch = useDispatch();
  const initialValues = {
    offerType: "PAID",
    offerPrice: "",
    isSampleRequired: false,
  };
  console.log("PaidFormSchema values -:", infoCam);
  const handlePaidForm = async (values) => {
    // console.log("PaidFormSchema values -:", infoCam._id);
    const formData = new FormData();

    const offerDetails = {
      offerDetails: {
        campaignId: infoCam._id,
        offers: [
          {
            offerType: "PAID",
            offerPrice: values.offerPrice,
          },
        ],
      },
      campaignDetails: {
        campaignId: infoCam._id,
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
  };

  return {
    initialValues,
    schema: paidSchema,
    submit: handlePaidForm,
  };
};
