import { useDispatch, useSelector } from "react-redux";
import { contentFormSchema } from "../schema";
import { crateCampaign } from "../../../../store/brief_builder/campaign/campaign.slice";

export const useContentForm = () => {
  const infoCam = useSelector(
    (state) => state.Campaign.getCampaignDetails?.campaign
  );
  const dispatch = useDispatch();
  const initialValues = {
    messaging: "",
    hooks: "",
    doDes: "",
    doNotDes: "",
  };

  const handleContentForm = (values) => {
    const { messaging, hooks, doDes, doNotDes } = values;
    console.log(infoCam?._id);
    const formData = new FormData();

    const campaignDetails = {
      campaignDetails: {
        campaignId: infoCam?._id,
        details: {
          campaignMessage: messaging,
          hooks: hooks,
          doThings: doDes,
          doNotThings: doNotDes,
        },
      },
    };
    formData.append("data", JSON.stringify(campaignDetails));
    dispatch(crateCampaign(formData));
  };

  return {
    initialValues,
    schema: contentFormSchema,
    submit: handleContentForm,
  };
};
