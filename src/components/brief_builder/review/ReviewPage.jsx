import Loading from "@/components/common/loader/Loading";
import { Box } from "@mui/material";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCampaignbyId } from "../../../../store/brief_builder/campaign/campaign.slice";
import BrandAbout from "./brandAbout/BrandAbout";
import DoPage from "./do_not_do/DoPage";
import MessageAbout from "./messageAbout/MessageAbout";
import MoodBond from "./moodBond/MoodBond";
import OfferAbout from "./offerAbout/OfferAbout";
import PaidPaymentInfo from "./paidPayment/PaidPaymentInfo";

const ReviewPage = () => {
  const dispatch = useDispatch();
  const infoCam = useSelector(
    (state) => state.Campaign.addCampaignDetails?.campaign
  );
  const { brief_builder } = useParams();
  useEffect(() => {
    if (infoCam?._id) {
      dispatch(getCampaignbyId({ campaignId: infoCam._id }));
    }
  }, [dispatch, infoCam?._id]);

  useEffect(() => {
    if (brief_builder && brief_builder.length > 0) {
      dispatch(getCampaignbyId({ campaignId: brief_builder[0] }));
    }
  }, [dispatch, brief_builder]);

  const campaignData = useSelector(
    (state) => state.Campaign.getCampaignbyId.campaignData
  );
  const isLoading = useSelector(
    (state) => state.Campaign.getCampaignbyId.loading
  );
  const error = useSelector((state) => state.Campaign.getCampaignbyId.error);

  const isEmptyData = !campaignData;

  const filteredData = campaignData?.offerDetails?.filter(
    (item) => item.offerType !== "PAID"
  );

  const filteredPaidData = campaignData?.offerDetails?.filter(
    (item) => item.offerType === "PAID"
  );

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
            <PaidPaymentInfo filteredPaidData={filteredPaidData} />
            <OfferAbout offerDetails={filteredData} />
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
