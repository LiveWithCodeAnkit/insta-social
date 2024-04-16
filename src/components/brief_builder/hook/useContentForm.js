import { useDispatch, useSelector } from "react-redux";
import { contentFormSchema } from "../schema";
import { createCampaign } from "../../../../store/brief_builder/campaign/campaign.slice";
import { useState } from "react";

export const useContentForm = ({ handleChange }) => {
  const infoCam = useSelector(
    (state) => state.Campaign.addCampaignDetails?.campaign
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    campaignName: "",
    messaging: "",
    hooks: "",
    doDes: "",
    doNotDes: "",
    images: [],
    externalLinks: [],
  };

  const handleContentForm = async (values) => {
    setLoading(true);

    const {
      messaging,
      hooks,
      doDes,
      doNotDes,
      images,
      externalLinks,
      campaignName,
    } = values;

    const formData = new FormData();

    const campaignDetails = {
      campaignDetails: {
        campaignId: infoCam?._id,
        details: {
          campaignName: campaignName,
          campaignMessage: messaging,
          hooks: hooks,
          doThings: doDes,
          doNotThings: doNotDes,
          moodBoardDocs: {
            externalLinks,
          },
        },
      },
    };

    formData.append("data", JSON.stringify(campaignDetails));
    images?.map((img) => {
      formData.append(`moodBoardDocs.contents`, img);
    });

    const res = await dispatch(createCampaign(formData));
    if (res.payload?.success) {
      handleChange(event, 1);
    }
    setLoading(false);
  };

  return {
    loading,
    initialValues,
    schema: contentFormSchema,
    submit: handleContentForm,
  };
};
