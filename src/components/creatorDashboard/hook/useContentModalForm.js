import { useDispatch, useSelector } from "react-redux";
import { uploadContentFormSchema } from "../schema";
import { getCampaignRequestByCreator, postContentSubmittedByCreator } from "../../../../store/campaign_request/campaignRequest.slice";


export const useContentModalForm = ({ allData, handleClose, updatingFunction = () => { } }) => {
    const dispatch = useDispatch();
    const loading = useSelector(
        (state) => state?.CampaignRequest?.campaignContentSubmittedByCreator?.loading
    );
    const initialValues = {
        images: [],
        captionName: "",
    };

    const handleContentForm = async (values) => {
        const { images, captionName } = values;

        const modifiedArray = images ? images.map((obj) => obj.file) : [];

        // console.log("into modal values", values);
        const formData = new FormData();

        const contentUploadDetails = {
            campaignId: allData?.campaignDetails?._id,
            campaignRequestId: allData?.id,
            contentCaption: captionName,
            uploadedContent: []
        };

        // console.log("values", contentUploadDetails);

        formData.append("data", JSON.stringify(contentUploadDetails));

        modifiedArray.forEach((item, index) => {
            formData.append(`uploadedContent[${index}].content`, item);
        });

        if (modifiedArray.length > 0) {
            const res = await dispatch(postContentSubmittedByCreator(formData));
            if (res.payload?.success) {
                handleClose();
                updatingFunction && updatingFunction();
            }
            console.log("res", res);
        }
    };

    return {
        initialValues,
        loading,
        schema: uploadContentFormSchema,
        submit: handleContentForm,
    };
};
