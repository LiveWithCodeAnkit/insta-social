import { useState } from "react";
import { createCampaign } from "../../../../store/brief_builder/campaign/campaign.slice";
import { productFormSchema } from "../schema";
import { useDispatch, useSelector } from "react-redux";

export const useProductsForm = ({ handleTab }) => {
  const infoCam = useSelector(
    (state) => state.Campaign.addCampaignDetails?.campaign
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    products: [
      {
        description: "",
      },
    ],
  };

  const handleProductForm = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();

      const productDetails = {
        productDetails: {
          campaignId: infoCam?._id,
          products: values.products.map((product) => ({
            brandId: infoCam?.brandDetails?._id,
            info: product.description,
          })),
        },
      };

      formData.append("data", JSON.stringify(productDetails));
      values.products.forEach((image, i) => {
        image.productImage.forEach((img, index) => {
          formData.append(`productImages[${i}]`, image.productImage[index]);
        });
      });

      const res = await dispatch(createCampaign(formData));
      if (res.payload?.success) {
        handleTab(5);
      }
    } catch (error) {
      console.error("Error handling product form:", error);
    }
    setLoading(false);
  };

  return {
    initialValues,
    loading,
    schema: productFormSchema,
    submit: handleProductForm,
  };
};
