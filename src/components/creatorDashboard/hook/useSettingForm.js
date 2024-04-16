import { useEffect } from "react";
// import { createCampaign } from "../../../../store/brief_builder/campaign/campaign.slice";
import { settingFormSchema } from "../schema/settingFormSchema";
import { useDispatch, useSelector } from "react-redux";
import { postCampaignByCreator } from "../../../../store/campaign_request/campaignRequest.slice";

export const useSettingForm = () => {
    const dispatch = useDispatch();
    const loading = useSelector(
        (state) => state.CampaignRequest?.addCampaignByCreator?.loading
    );

    const initialValues = {
        firstName: "",
        lastName: "",
        gender: " ",
        language: " ",
        instagramUserName: "",
        tiktokUserName: "",
        dob: "",
        email: "",
        phone: "",
        address1: "",
        address2: "",
        cityName: "",
        stateName: "",
        postalCode: "",
        countryName: " ",
    };

    const convertToUTC = (date) => {
        if (date) {
            return new Date(date).toISOString();
        }
        return "";
    };


    const handleSettingForm = async (values) => {

        const {
            firstName,
            lastName,
            instagramUserName,
            tiktokUserName,
            language,
            gender,
            dob,
            email,
            phone,
            address1,
            address2,
            cityName,
            stateName,
            postalCode,
            countryName
        } = values;

        console.log("values", values);

        const dobUTC = convertToUTC(dob);
        console.log("dobUTC", dobUTC);

        const settingCreatorDetails = {
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            dob: dobUTC,
            language: language,
            email: email,
            phone: phone,
            address1: address1,
            address2: address2,
            city: cityName,
            state: stateName,
            postalCode: postalCode,
            country: countryName.value,
            socialMediaLinks: [
                { platForm: "Instagram", link: null, userName: instagramUserName },
                { platForm: "Tiktok", link: null, userName: tiktokUserName },
            ],
        };


        dispatch(postCampaignByCreator(settingCreatorDetails));
    };

    return {
        initialValues,
        loading,
        schema: settingFormSchema,
        submit: handleSettingForm,
    };
};
