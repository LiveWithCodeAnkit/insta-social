import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { todoIssueFormSchema } from "../schema";
import { postTodoIssueByCreator } from "../../../../store/campaign_request/campaignRequest.slice";

export const useTodoIssueForm = ({ allData, handleClose, updatingFunction = () => { } }) => {
    const dispatch = useDispatch();
    // console.log(allData, "allDataallData");
    const loading = useSelector(
        (state) => state?.CampaignRequest?.campaignTodoIssuesByCreator?.loading
    );

    const initialValues = {
        // campaignsName: "",
        issueType: " ",
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
            updatingFunction && updatingFunction();
        }
    };

    return {
        initialValues,
        loading,
        schema: todoIssueFormSchema,
        submit: handleIssueForm,
    };
};
