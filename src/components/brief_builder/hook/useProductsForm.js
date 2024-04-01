import { createCampaign } from "../../../../store/brief_builder/campaign/campaign.slice";
import { productFormSchema } from "../schema";
import { useDispatch, useSelector } from "react-redux";

export const useProductsForm = ({ handleTab }) => {
  const infoCam = useSelector(
    (state) => state.Campaign.addCampaignDetails?.campaign
  );
  const dispatch = useDispatch();

  console.log("info cam:-", infoCam?.brandDetails);
  const initialValues = {
    products: [
      {
        description: "",
      },
    ],
  };

  const handleProductForm = async (values) => {
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

      console.log("i am product form :-", values.products);

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
  };

  return {
    initialValues,
    schema: productFormSchema,
    submit: handleProductForm,
  };
};
