import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import BrandAbout from "./brandAbout/BrandAbout";
import OfferAbout from "./offerAbout/OfferAbout";
import MoodBond from "./moodBond/MoodBond";
import MessageAbout from "./messageAbout/MessageAbout";
import DoPage from "./do_not_do/DoPage";
import { getCampaignbyId } from "../../../../store/brief_builder/campaign/campaign.slice";

const ReviewPage = () => {
  const dispatch = useDispatch();
  const infoCam = useSelector(
    (state) => state.Campaign.addCampaignDetails?.campaign
  );
  useEffect(() => {
    if (infoCam?._id) {
      // Ensure that infoCam._id is available before dispatching
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

  console.log("campaignData", campaignData.brandDetails);
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
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        {!isLoading && !error && !isEmptyData && (
          <>
            <BrandAbout brandDeatils={campaignData?.brandDetails} />
            <OfferAbout />
            <MoodBond />
            <MessageAbout />
            <DoPage />
          </>
        )}
      </Box>
    </>
  );
};

export default ReviewPage;
