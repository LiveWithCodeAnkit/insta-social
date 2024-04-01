import { configureStore } from "@reduxjs/toolkit";
import campaignSlice from "./brief_builder/campaign/campaign.slice";
import campaignRequestSlice from "./campaign_request/campaignRequest.slice";

export const store = configureStore({
  reducer: {
    Campaign: campaignSlice,
    CampaignRequest: campaignRequestSlice,
  },
});
