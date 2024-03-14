import { creatorsSchema } from "../schema";
import { useDispatch, useSelector } from "react-redux";
import { crateCampaign } from "../../../../store/brief_builder/campaign/campaign.slice";

export const useCreatorsForm = () => {
  const infoCam = useSelector(
    (state) => state.Campaign.getCampaignDetails?.campaign
  );
  const dispatch = useDispatch();
  const initialValues = {
    country: "",
    gender: "",
    age: [20, 32],
  };

  const handleCreatorForm = (values) => {
    console.log("CreatorForm values -:", values);
    console.log(infoCam?._id);
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
    dispatch(crateCampaign(formData));
  };

  return {
    initialValues,
    schema: creatorsSchema,
    submit: handleCreatorForm,
  };
};
