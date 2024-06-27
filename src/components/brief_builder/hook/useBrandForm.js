import { useEffect, useMemo, useState } from "react";
import {
  createCampaign,
  getCampaignbyId,
} from "../../../../store/brief_builder/campaign/campaign.slice";
import { brandFormSchema } from "../schema";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { debounce } from "lodash";

export const useBrandForm = ({ handleTab }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { brief_builder } = useParams();

  const infoCam = useSelector(
    (state) => state.Campaign.addCampaignDetails?.campaign
  );

  const campaignData = useSelector(
    (state) => state.Campaign.getCampaignbyId.campaignData
  );

  const fetchCampaignByIdDebounced = debounce((id) => {
    dispatch(getCampaignbyId({ campaignId: id }));
  }, 300);

  useEffect(() => {
    if (infoCam?._id) {
      fetchCampaignByIdDebounced(infoCam._id);
    }
    return () => {
      fetchCampaignByIdDebounced.cancel();
    };
  }, [dispatch, infoCam?._id]);

  useEffect(() => {
    if (brief_builder && brief_builder.length > 0) {
      fetchCampaignByIdDebounced(brief_builder[0]);
    }
    return () => {
      fetchCampaignByIdDebounced.cancel();
    };
  }, [dispatch, brief_builder]);

  const brandeDetails = campaignData?.brandDetails;

  const campaignId = infoCam?._id || (brief_builder && brief_builder[0]);

  const handleBrandForm = async (values) => {
    setLoading(true);

    try {
      const {
        brandName,
        brandDescription,
        brandTiktok,
        brandWebsite,
        fileUpload,
        brandInstagram,
      } = values;

      const formData = new FormData();
      const brandDetails = {
        ...(campaignId && { campaignId: campaignId }),
        brandDetails: {
          ...(brandeDetails && { _id: brandeDetails._id }),
          name: brandName,
          type: "xyz",
          info: brandDescription,
          website: brandWebsite,
          socialMediaLinks: [
            { platForm: "Instagram", link: brandInstagram },
            { platForm: "Tiktok", link: brandTiktok },
          ],
        },
      };

      formData.append("data", JSON.stringify(brandDetails));
      if (fileUpload) {
        formData.append("brandDetails.logo", fileUpload[0]);
        const res = await dispatch(createCampaign(formData));
        if (res.payload?.success) {
          handleTab(1);
        }
      }
    } catch (error) {
      console.error("An error occurred while submitting the form:", error);
    } finally {
      setLoading(false);
    }
  };

  const initialValues = useMemo(
    () => ({
      brandName: brandeDetails?.name || "",
      brandWebsite: brandeDetails?.website || "",
      brandInstagram:
        (
          brandeDetails?.socialMediaLinks.find(
            (link) => link.platForm === "Instagram"
          ) || {}
        ).link || "",
      brandTiktok:
        (
          brandeDetails?.socialMediaLinks.find(
            (link) => link.platForm === "Tiktok"
          ) || {}
        ).link || "",
      brandDescription: brandeDetails?.info || "",
      fileUpload: brandeDetails?.logo ? [brandeDetails?.logo] : [],
    }),
    [brandeDetails]
  );
  return {
    initialValues: initialValues,
    loading,
    schema: brandFormSchema,
    submit: handleBrandForm,
  };
};
