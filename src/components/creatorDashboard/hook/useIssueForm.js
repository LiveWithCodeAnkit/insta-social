import { useDispatch, useSelector } from "react-redux";
import { issueFormSchema } from "../schema";
import { postContentLinkByCreator, postContentSubmittedByCreator } from "../../../../store/campaign_request/campaignRequest.slice";


export const useIssueForm = ({ allData, handleClose }) => {
    // const infoCam = useSelector(
    //     (state) => state.Campaign.addCampaignDetails?.campaign
    // );
    const dispatch = useDispatch();
    const initialValues = {
        link: "",
    };

    const handleIssueLinkForm = async (values) => {
        const { link } = values;

        const contentLinkDetails = {
            campaignRequestId: allData?.id,
            postedContents: [
                {
                    platformName: "Instagram",
                    contentLink: link
                }
            ]
        };

        console.log("contentLinkDetails", contentLinkDetails);

        const res = await dispatch(postContentLinkByCreator(contentLinkDetails));
        if (res.payload?.success) {
            handleClose();
        }
        console.log("res", res);
    };

    return {
        initialValues,
        schema: issueFormSchema,
        submit: handleIssueLinkForm,
    };
};
