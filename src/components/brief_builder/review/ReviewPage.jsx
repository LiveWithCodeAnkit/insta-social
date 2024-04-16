import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import BrandAbout from "./brandAbout/BrandAbout";
import OfferAbout from "./offerAbout/OfferAbout";
import MoodBond from "./moodBond/MoodBond";
import MessageAbout from "./messageAbout/MessageAbout";
import DoPage from "./do_not_do/DoPage";
import { getCampaignbyId } from "../../../../store/brief_builder/campaign/campaign.slice";
import Loading from "@/components/common/loader/Loading";

const ReviewPage = () => {
  const dispatch = useDispatch();
  const infoCam = useSelector(
    (state) => state.Campaign.addCampaignDetails?.campaign
  );

  useEffect(() => {
    if (infoCam?._id) {
      dispatch(getCampaignbyId({ campaignId: infoCam._id }));
    }
  }, [dispatch, infoCam?._id]);

  const campaignData = useSelector(
    (state) => state.Campaign.getCampaignbyId.campaignData
  );
  const isLoading = useSelector(
    (state) => state.Campaign.getCampaignbyId.loading
  );
  const error = useSelector((state) => state.Campaign.getCampaignbyId.error);

  const isEmptyData = !campaignData;

  return (
    <>
      <Box
        as="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1.8rem",
          padding: "1.8rem",
        }}
      >
        {isLoading && (
          <div>
            <Loading />
          </div>
        )}
        {error && <p>Error: {error}</p>}

        {!isLoading && !error && !isEmptyData && (
          <>
            <BrandAbout brandDeatils={campaignData?.brandDetails} />
            <OfferAbout offerDetails={campaignData?.offerDetails} />
            <MoodBond
              moodDeatils={campaignData?.campaignDetails?.moodBoardDocs}
            />
            <MessageAbout
              campaignDetails={campaignData?.campaignDetails}
              productDetails={campaignData?.productDetails}
            />
            <DoPage campaignDetails={campaignData?.campaignDetails} />
          </>
        )}
      </Box>
    </>
  );
};

export default ReviewPage;
