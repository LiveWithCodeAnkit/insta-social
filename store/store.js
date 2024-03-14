import { configureStore } from "@reduxjs/toolkit";
import campaignSlice from "./brief_builder/campaign/campaign.slice";
export const store = configureStore({
  reducer: {
    Campaign: campaignSlice,
  },
});
