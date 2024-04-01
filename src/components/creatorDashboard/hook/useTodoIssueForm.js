import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { todoIssueFormSchema } from "../schema";
import { postTodoIssueByCreator } from "../../../../store/campaign_request/campaignRequest.slice";

export const useTodoIssueForm = ({ allData, handleClose }) => {
    const dispatch = useDispatch();
    // console.log(allData, "allDataallData");
    // const settingInfo = useSelector(
    //     (state) => state.CampaignRequest.addCampaignByCreator?.addCampaignByCreatorData
    // );

    const initialValues = {
        // campaignsName: "",
        issueType: "",
        issueInfo: "",
    };

    const handleIssueForm = async (values) => {

        const {
            campaignsName,
            issueType,
            issueInfo
        } = values;

        // console.log("valuesvaluesvalues", values);

        const issueDetailsbyCreator = {
            // campaignsName: campaignsName,
            campaignId: allData?.campaignDetails,
            campaignRequestId: allData?.id,
            issueType: issueType,
            issueInfo: issueInfo,
        }

        // console.log("issueDetailsbyCreator", issueDetailsbyCreator);

        const res = await dispatch(postTodoIssueByCreator(issueDetailsbyCreator));
        if (res.payload?.success) {
            handleClose();
        }
    };

    return {
        initialValues,
        schema: todoIssueFormSchema,
        submit: handleIssueForm,
    };
};
