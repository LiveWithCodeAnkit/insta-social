import { offerFormSchema } from "../schema";
import { useDispatch, useSelector } from "react-redux";
import { createCampaign } from "../../../../store/brief_builder/campaign/campaign.slice";

export const useOfferForm = ({ handleChange }) => {
  const infoCam = useSelector(
    (state) => state.Campaign.addCampaignDetails?.campaign
  );
  const dispatch = useDispatch();

  const initialValues = {
    gifts: [
      {
        productName: "",
        description: "",
        productLink: "",
        unitsPerCreator: 0,
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
    const formData = new FormData();
    const offerDetails = {
      offerDetails: {
        campaignId: infoCam._id,
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
    console.log("Offer Log :-", offerDetails);

    formData.append("data", JSON.stringify(offerDetails));

    values.gifts.map((abc, index) =>
      formData.append(`offerImage[${index}]`, abc.offerImage[0])
    );

    const res = await dispatch(createCampaign(formData));
    if (res.payload?.success) {
      handleChange(event, 1);
    }
  };

  return {
    initialValues,
    schema: offerFormSchema,
    submit: handleOfferForm,
  };
};
