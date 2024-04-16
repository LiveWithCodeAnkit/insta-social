import { useDispatch, useSelector } from "react-redux";
import { issueFormSchema } from "../schema";
import { getCampaignRequestByCreator, postContentLinkByCreator, postContentSubmittedByCreator } from "../../../../store/campaign_request/campaignRequest.slice";


export const useIssueForm = ({ allData, handleClose, updatingFunction = () => { } }) => {
    const loading = useSelector(
        (state) => state.CampaignRequest?.campainContentLinkbyCreator?.loading
    );
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
            updatingFunction && updatingFunction();
        }
        // console.log("res", res);
    };

    return {
        initialValues,
        schema: issueFormSchema,
        loading,
        submit: handleIssueLinkForm,
    };
};
