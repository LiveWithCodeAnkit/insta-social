import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { todoIssueFormSchema, trackingFormSchema } from "../schema";
import { trackingDetails } from "../../../../store/campaign_request/campaignRequest.slice";

export const useTrackingForm = ({ modalData, handleClose, updatingFunction = () => { } }) => {
    const dispatch = useDispatch();

    const initialValues = {
        trackingNumber: ""
    };

    const handleTrackingForm = async (values) => {

        const {
            trackingNumber
        } = values;

        // console.log("valuesvaluesvalues", values);

        const trackingAllDetails = {
            trackingNumber: trackingNumber,
            campaignRequestId: modalData?.id,
        }

        const res = await dispatch(trackingDetails(trackingAllDetails))
        if (res.payload?.success) {
            handleClose();
            updatingFunction()
        }
    };

    return {
        initialValues,
        schema: trackingFormSchema,
        submit: handleTrackingForm,
    };
};
