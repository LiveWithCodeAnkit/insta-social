"use client";
import React, { useEffect } from "react";
import { Box } from "@mui/material";
import BrandAbout from "./brandAbout/BrandAbout";
import MoodBond from "./moodBond/MoodBond";
import MessageAbout from "./messageAbout/MessageAbout";
import DoPage from "./do_not_do/DoPage";
import { useParams } from "next/navigation";
import ShippingInfo from "./shippingInfo/ShippingInfo";
import JoinCampaign from "./joinCampaign/JoinCampaign";
import { useDispatch, useSelector } from "react-redux";
import { getCampaignCreatorbyId } from "../../../../../store/campaign_request/campaignRequest.slice";
import { useSearchParams } from "next/navigation";
import AboutConcept from "./conceptAbout/AboutConcept";

const ReviewPage = () => {
  const dispatch = useDispatch();
  const paramsId = useParams();
  const queryParamsId = useSearchParams();
  const campaignCreatorData = useSelector(
    (state) =>
      state.CampaignRequest?.getCampaignCreatorbyId
        ?.getCampaignCreatorbyIdAllData
  );
  console.log(campaignCreatorData, "campaignCreatorData");
  const campaignRequestId = queryParamsId.get("data");
  console.log("campaignRequestId", campaignRequestId);
  console.log("paramsId", paramsId);

  useEffect(() => {
    const res = dispatch(getCampaignCreatorbyId({ campaignId: paramsId?.id }));
  }, [paramsId?.id]);

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
        <BrandAbout campaignCreatorData={campaignCreatorData} />
        <MoodBond campaignCreatorData={campaignCreatorData} />
        <AboutConcept />
        <MessageAbout campaignCreatorData={campaignCreatorData} />
        <DoPage campaignCreatorData={campaignCreatorData} />
        {campaignRequestId && <ShippingInfo />}
        {campaignRequestId && (
          <JoinCampaign
            campaignCreatorData={campaignCreatorData}
            campaignRequestId={campaignRequestId}
          />
        )}
      </Box>
    </>
  );
};

export default ReviewPage;
