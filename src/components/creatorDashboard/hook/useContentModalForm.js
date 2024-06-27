import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadContentFormSchema } from "../schema";
import { getCampaignRequestByCreator, postContentRejectModalByCreator, postContentSubmittedByCreator } from "../../../../store/campaign_request/campaignRequest.slice";


export const useContentModalForm = ({ allData, handleClose, updatingFunction = () => { } }) => {
    const dispatch = useDispatch();
    const loading = useSelector(
        (state) => state?.CampaignRequest?.campaignContentSubmittedByCreator?.loading
    );

    const contentRejectbyBrand = useSelector(
        (state) =>
            state.CampaignRequest?.contentRejectedModalByCreator
                .contentRejectedModalByCreatorData
    );

    const initialValues = useMemo(() => ({
        images: contentRejectbyBrand?.data?.data?.uploadedContent.map((item) => (item)) || [],
        captionName: contentRejectbyBrand?.data?.data?.caption || "",
    }), [contentRejectbyBrand])

    // console.log(contentImagesData, "contentImagesData")
    console.log(contentRejectbyBrand, "contentRejectbyBrand")
    useEffect(() => {
        dispatch(
            postContentRejectModalByCreator({
                campaignId: allData?.campaignDetails?._id,
                campaignRequestId: allData?.id,
            })
        );
    }, [allData])
    // console.log(contentRejectData?.uploadedContent?.content, "contentRejectData?.uploadedContent?.content")

    const handleContentForm = async (values) => {
        const { images, captionName } = values;

        console.log(values, "values")

        const imageURLs = images.filter((image) => typeof image === "string");

        // const modifiedArray = images ? images.map((obj) => obj.file) : [];

        // console.log("values into modified", modifiedArray);
        const formData = new FormData();

        const contentUploadDetails = {
            campaignId: allData?.campaignDetails?._id,
            campaignRequestId: allData?.id,
            contentCaption: captionName,
            uploadedContent: imageURLs
        };

        // console.log("values in contenetUpload", contentUploadDetails);
        // console.log(values, "values");

        formData.append("data", JSON.stringify(contentUploadDetails));

        const fileObjects = images?.filter(
            (item) => typeof item === "object" && !(item instanceof String)
        );

        fileObjects.forEach((item, index) => {
            // console.log(item, "item into content modal form", index)
            formData.append(`uploadedContent[${index}].content`, item);
        });

        const res = await dispatch(postContentSubmittedByCreator(formData));
        if (res.payload?.success) {
            handleClose();
            updatingFunction && updatingFunction();
        }
    };

    return {
        initialValues,
        loading,
        schema: uploadContentFormSchema,
        submit: handleContentForm,
    };
};
