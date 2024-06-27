import { creatorsSchema } from "../schema";
import { useDispatch, useSelector } from "react-redux";
import {
  createCampaign,
  getCampaignbyId,
} from "../../../../store/brief_builder/campaign/campaign.slice";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export const useCreatorsForm = ({ handleTab }) => {
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
  const countryCriteriaArray =
    campaignData?.campaignDetails?.countryCriteria || [];
  const countryObjectsArray = countryCriteriaArray.map((country) => ({
    value: country,
    label: country,
  }));

  const ageCriteria = campaignData?.campaignDetails?.ageCriteria;
  let ageArray;
  if (
    ageCriteria &&
    typeof ageCriteria === "object" &&
    "minAge" in ageCriteria &&
    "maxAge" in ageCriteria
  ) {
    ageArray = [ageCriteria.minAge, ageCriteria.maxAge];
  } else {
    ageArray = [20, 32];
  }

  //gender

  const genderCriteria = campaignData?.campaignDetails?.genderCriteria || [];

  // Map over genderCriteria to transform each value into an object
  const formattedGenderCriteria = genderCriteria.map((gender) => ({
    value: gender,
    label: gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase(),
  }));

  ///

  const initialValues = {
    country: countryObjectsArray,
    gender: formattedGenderCriteria,
    age: ageArray,
  };

  const [loading, setLoading] = useState(false);

  const campaignId = infoCam?._id || (brief_builder && brief_builder[0]);

  const handleCreatorForm = async (values) => {
    setLoading(true);
    const { country, gender, age } = values;

    const countryArray = country.map((countryObj) => countryObj.value);
    const generArray = gender.map((countryObj) => countryObj.value);
    const formData = new FormData();

    const campaignDetails = {
      campaignDetails: {
        campaignId: campaignId,
        details: {
          ageCriteria: {
            minAge: age[0],
            maxAge: age[1],
          },
          genderCriteria: generArray,
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
