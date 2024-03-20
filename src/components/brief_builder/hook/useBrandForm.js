import { useEffect } from "react";
import { createCampaign } from "../../../../store/brief_builder/campaign/campaign.slice";
import { brandFormSchema } from "../schema";
import { useDispatch, useSelector } from "react-redux";

export const useBrandForm = ({ handleTab }) => {
  const dispatch = useDispatch();
  const loading = useSelector(
    (state) => state.Campaign.addCampaignDetails?.campaign.loading
  );

  const initialValues = {
    brandName: "",
    brandWebsite: "",
    brandInstagram: "",
    brandTiktok: "",
    brandDescription: "",
    fileUpload: "",
  };

  const handleBrandForm = async (values) => {
    const {
      brandName,
      brandDescription,
      brandTiktok,
      brandWebsite,
      fileUpload,
      brandInstagram,
    } = values;

    console.log("values:-",values);
    const formData = new FormData();
    const brandDetails = {
      brandDetails: {
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
  };

  return {
    initialValues,
    loading,
    schema: brandFormSchema,
    submit: handleBrandForm,
  };
};
