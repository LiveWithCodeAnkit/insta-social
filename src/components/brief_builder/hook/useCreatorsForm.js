import { creatorsSchema } from "../schema";
import { useDispatch, useSelector } from "react-redux";
import { createCampaign } from "../../../../store/brief_builder/campaign/campaign.slice";
import { useState } from "react";

export const useCreatorsForm = ({ handleTab }) => {
  const infoCam = useSelector(
    (state) => state.Campaign.addCampaignDetails?.campaign
  );
  const dispatch = useDispatch();
  const initialValues = {
    country: [],
    gender: " ",
    age: [20, 32],
  };
  const [loading, setLoading] = useState(false);

  const handleCreatorForm = async (values) => {
    setLoading(true);
    const { country, gender, age } = values;

    const countryArray = country.map((countryObj) => countryObj.value);

    const formData = new FormData();

    const campaignDetails = {
      campaignDetails: {
        campaignId: infoCam && infoCam._id,
        details: {
          ageCriteria: {
            minAge: age[0],
            maxAge: age[1],
          },
          genderCriteria: gender,
          countryCriteria: countryArray,
        },
      },
    };
    formData.append("data", JSON.stringify(campaignDetails));
    const res = await dispatch(createCampaign(formData));
    if (res.payload?.success) {
      handleTab(6);
    }
    setLoading(false);
  };

  return {
    initialValues,
    loading,
    schema: creatorsSchema,
    submit: handleCreatorForm,
  };
};
