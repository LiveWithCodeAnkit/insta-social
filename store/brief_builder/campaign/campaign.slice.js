import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FORM_DATA_POST } from "@/services/methods";

export const crateCampaign = createAsyncThunk(
  "create-campaign",
  async (payload) => {
    try {
      const response = await FORM_DATA_POST(
        "campaign/create-campaign",
        payload
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const campaignSlice = createSlice({
  name: "campaign",
  initialState: {
    getCampaignDetails: {
      loading: false,
      campaign: {},
      error: "",
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(crateCampaign.pending, (state) => {
        state.getCampaignDetails.loading = true;
      })
      .addCase(crateCampaign.fulfilled, (state, action) => {
        console.log("action.payload :-", action.payload);

        state.getCampaignDetails.loading = false;
        state.getCampaignDetails.campaign = action.payload;
      })
      .addCase(crateCampaign.rejected, (state) => {
        state.getCampaignDetails.loading = false;
        state.getCampaignDetails.error = "Network Error !!!";
      });
  },
});

export default campaignSlice.reducer;
