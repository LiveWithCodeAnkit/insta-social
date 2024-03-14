import { crateCampaign } from "../../../../store/brief_builder/campaign/campaign.slice";
import { brandFormSchema } from "../schema";
import { useDispatch } from "react-redux";

export const useBrandForm = ({handleTab}) => {
  const dispatch = useDispatch();

  const initialValues = {
    brandName: "",
    brandWebsite: "",
    brandInstagram: "",
    brandTiktok: "",
    brandDescription: "",
    fileUpload: "",
  };

  const handleBrandForm =async (values) => {
    console.log("brand form:-", values);
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
      brandDetails:{name: brandName,
      type: "xyz",
      info: brandDescription,
      website: brandWebsite,
      socialMediaLinks: [
        { platForm: "Instagram", link: brandInstagram },
        { platForm: "Tiktok", link: brandTiktok },
      ],}
    };

    formData.append("data", JSON.stringify(brandDetails));

    if (fileUpload) {
      console.log(fileUpload,"fileUpdload");
      formData.append("brandDetails.logo", fileUpload[0]);
      const res=await dispatch(crateCampaign(formData));
    
      console.log(res);
      handleTab(1)
     
    }
  };

  return {
    initialValues,
    schema: brandFormSchema,
    submit: handleBrandForm,
  };
};
