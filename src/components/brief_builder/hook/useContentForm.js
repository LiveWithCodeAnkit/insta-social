import { useDispatch, useSelector } from "react-redux";
import { contentFormSchema } from "../schema";
import { createCampaign } from "../../../../store/brief_builder/campaign/campaign.slice";

export const useContentForm = ({ handleChange }) => {
  const infoCam = useSelector(
    (state) => state.Campaign.addCampaignDetails?.campaign
  );
  const dispatch = useDispatch();
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
    const {
      messaging,
      hooks,
      doDes,
      doNotDes,
      images,
      externalLinks,
      campaignName,
    } = values;

    const modifiedArray = images ? images.map((obj) => obj.file) : [];

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

    console.log("values", campaignDetails);
    formData.append("data", JSON.stringify(campaignDetails));
    images?.map((img) => {
      formData.append(`moodBoardDocs.contents`, img.file);
    });

    formData.append(`moodBoardDocs.contents`, modifiedArray);

    console.log("modifiedArray:-", modifiedArray);

    const res = await dispatch(createCampaign(formData));
    if (res.payload?.success) {
      handleChange(event, 1);
    }
  };

  return {
    initialValues,
    schema: contentFormSchema,
    submit: handleContentForm,
  };
};
