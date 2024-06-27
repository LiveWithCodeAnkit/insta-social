import { configureStore } from "@reduxjs/toolkit";
import campaignSlice from "./brief_builder/campaign/campaign.slice";
import campaignRequestSlice from "./campaign_request/campaignRequest.slice";
import chatSokcetSlice from "./chat_scoket/chatSokcetSlice";
import appSlice from "./chat_scoket/appSlice";

export const store = configureStore({
  reducer: {
    Campaign: campaignSlice,
    CampaignRequest: campaignRequestSlice,
    ChatRequest: chatSokcetSlice,
    AppRequest: appSlice,
  },
});
