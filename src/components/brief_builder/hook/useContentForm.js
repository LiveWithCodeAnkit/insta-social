import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCampaign,
  getCampaignbyId,
} from "../../../../store/brief_builder/campaign/campaign.slice";
import { contentFormSchema } from "../schema";

export const useContentForm = ({ handleTab }) => {
  const infoCam = useSelector(
    (state) => state.Campaign.addCampaignDetails?.campaign
  );
  const dispatch = useDispatch();
  const { brief_builder } = useParams();
  const [loading, setLoading] = useState(false);
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

  const externalLinksInitialValues = campaignData?.campaignDetails
    ?.moodBoardDocs?.externalLinks || [{ label: "", value: "" }];

  const initialValues = {
    campaignName: campaignData?.campaignDetails?.campaignName || "",
    messaging: campaignData?.campaignDetails?.campaignMessage || "",
    campaignConcept: campaignData?.campaignDetails?.campaignConcept || "",
    hooks: campaignData?.campaignDetails?.hooks || "",
    doDes: campaignData?.campaignDetails?.doThings || "",
    doNotDes: campaignData?.campaignDetails?.doNotThings || "",
    images: campaignData?.campaignDetails?.moodBoardDocs?.contents || [],
    externalLinks: externalLinksInitialValues,
  };

  const campaignId = infoCam?._id || (brief_builder && brief_builder[0]);

  const handleContentForm = async (values) => {
    setLoading(true);

    const {
      messaging,
      campaignConcept,
      hooks,
      doDes,
      doNotDes,
      images,
      externalLinks,
      campaignName,
    } = values;

    const formData = new FormData();
    const imageURLs = images.filter((image) => typeof image === "string");
    const campaignDetails = {
      campaignDetails: {
        campaignId: campaignId,
        details: {
          campaignName: campaignName,
          campaignMessage: messaging,
          campaignConcept: campaignConcept,
          hooks: hooks,
          doThings: doDes,
          doNotThings: doNotDes,
          moodBoardDocs: {
            contents: imageURLs,
            externalLinks,
          },
        },
      },
    };

    formData.append("data", JSON.stringify(campaignDetails));

    const fileObjects = images.filter(
      (item) => typeof item === "object" && !(item instanceof String)
    );

    fileObjects?.map((img) => {
      formData.append(`moodBoardDocs.contents`, img);
    });

    const res = await dispatch(createCampaign(formData));
    if (res.payload?.success) {
      handleTab(5);
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
