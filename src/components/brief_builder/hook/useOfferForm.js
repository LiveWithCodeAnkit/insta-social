import { offerFormSchema } from "../schema";
import { useDispatch, useSelector } from "react-redux";
import { createCampaign } from "../../../../store/brief_builder/campaign/campaign.slice";
import { useState } from "react";

export const useOfferForm = ({ handleChange }) => {
  const infoCam = useSelector(
    (state) => state.Campaign.addCampaignDetails?.campaign
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const initialValues = {
    gifts: [
      {
        offerImage: null,
        productName: "",
        description: "",
        productLink: "",
        unitsPerCreator: "0",
        variants: [
          {
            variantType: [],
            variantDes: "",
          },
        ],
      },
    ],
  };

  const handleOfferForm = async (values) => {
    setLoading(true);

    try {
      const formData = new FormData();
      const offerDetails = {
        offerDetails: {
          campaignId: infoCam?._id,
          offers: values.gifts.map((gift) => ({
            productName: gift.productName,
            description: gift.description,
            productLink: gift.productLink,
            unitsPerCreator: gift.unitsPerCreator,
            variants: gift.variants.map((variant) => ({
              variantType: variant.variantType,
              variantDes: variant.variantDes,
            })),
          })),
        },
      };

      formData.append("data", JSON.stringify(offerDetails));

      values.gifts.forEach((gift, index) => {
        formData.append(`offerImage[${index}]`, gift.offerImage[0]);
      });

      const res = await dispatch(createCampaign(formData));
      if (res.payload?.success) {
        handleChange(event, 1);
      }
    } catch (error) {
      // Handle any errors here
      console.error("An error occurred:", error);
    } finally {
      // Perform cleanup operations here
      setLoading(false);
    }
  };

  return {
    initialValues,
    loading,
    schema: offerFormSchema,
    submit: handleOfferForm,
  };
};
