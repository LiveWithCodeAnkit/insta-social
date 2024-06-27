import { offerFormSchema } from "../schema";
import { useDispatch, useSelector } from "react-redux";
import {
  createCampaign,
  getCampaignbyId,
} from "../../../../store/brief_builder/campaign/campaign.slice";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export const useOfferForm = ({ handleTabInside, handleTab }) => {
  const infoCam = useSelector(
    (state) => state.Campaign.addCampaignDetails?.campaign
  );
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
  const [loading, setLoading] = useState(false);

  const initialValues =
    campaignData?.offerDetails && Array.isArray(campaignData.offerDetails)
      ? {
          gifts: campaignData.offerDetails
            .filter((item) => item.offerType !== "PAID")
            .map((offer) => ({
              ...(offer._id && { _id: offer._id }),
              offerImage: [offer.offerImage || ""],
              productName: offer.productName || "",
              description: offer.description || "",
              productLink: offer.productLink || "",
              variantType: offer.variant?.variantType || [],
              variantDes: offer.variant?.variantDes || "",
            })),
        }
      : {
          gifts: [
            {
              offerImage: [],
              productName: "",
              description: "",
              productLink: "",
              variantType: [],
              variantDes: "",
            },
          ],
        };
  const campaignId = infoCam?._id || (brief_builder && brief_builder[0]);

  const handleOfferForm = async (values) => {
    setLoading(true);

    try {
      const formData = new FormData();
      const offerDetails = {
        offerDetails: {
          campaignId: campaignId,
          offers: values.gifts.map((gift) => ({
            ...(gift._id && { _id: gift._id }),
            productName: gift.productName,
            description: gift.description,
            productLink: gift.productLink,
            variant: {
              variantType: gift.variantType,
              variantDes: gift.variantDes,
            },
          })),
        },
      };

      formData.append("data", JSON.stringify(offerDetails));

      values.gifts.forEach((gift, index) => {
        formData.append(`offerImage[${index}]`, gift.offerImage[0]);
      });

      const res = await dispatch(createCampaign(formData));
      if (res.payload?.success) {
        handleTab(3);
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
