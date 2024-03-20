import { creatorsSchema } from "../schema";
import { useDispatch, useSelector } from "react-redux";
import { createCampaign } from "../../../../store/brief_builder/campaign/campaign.slice";

export const useCreatorsForm = ({ handleTab }) => {
  const infoCam = useSelector(
    (state) => state.Campaign.addCampaignDetails?.campaign
  );
  const dispatch = useDispatch();
  const initialValues = {
    country: "",
    gender: "",
    age: [20, 32],
  };

  const handleCreatorForm = async (values) => {
    const { country, gender, age } = values;
    const formData = new FormData();

    const campaignDetails = {
      campaignDetails: {
        campaignId: infoCam?._id,
        details: {
          ageCriteria: {
            minAge: age[0],
            maxAge: age[1],
          },
          genderCriteria: gender,
          countryCriteria: country,
        },
      },
    };
    formData.append("data", JSON.stringify(campaignDetails));
    const res = await dispatch(createCampaign(formData));
    if (res.payload?.success) {
      handleTab(6);
    }
  };

  return {
    initialValues,
    schema: creatorsSchema,
    submit: handleCreatorForm,
  };
};
