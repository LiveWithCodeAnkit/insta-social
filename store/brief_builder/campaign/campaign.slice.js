import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useToastMessages } from "@/components/lib/messages/useToastMessages";
import { FORM_DATA_POST, GET, POST } from "@/services/methods";

const { Success, Warn } = useToastMessages();

export const getCampaignsData = createAsyncThunk(
  "get-campaigns",
  async (payload) => {
    try {
      const response = await GET(
        `campaign/get-campaigns?page=${payload.page}&pageSize=${payload.pageSize}&status=${payload.status}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getCampaignbyId = createAsyncThunk(
  "get-campaignbyId",
  async (payload) => {
    try {
      const response = await GET(
        `/campaign/get-campaign-by-id?campaignId=${payload.campaignId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const createCampaign = createAsyncThunk(
  "create-campaign",
  async (payload) => {
    try {
      const response = await FORM_DATA_POST(
        "campaign/create-campaign",
        payload
      );

      if (response.success) {
        Success(response.message);
        return response;
      } else {
        Warn(response.message);
        return response;
      }
    } catch (error) {
      Warn(error);
      throw error;
    }
  }
);

//launch camp
export const addlaunchCampaign = createAsyncThunk(
  "add-launchCampaign",
  async (payload) => {
    try {
      const response = await POST("campaign/launch-campaign", {
        campaignId: payload,
      });

      if (response.success) {
        Success(response.message);
        return response;
      } else {
        Warn(response.message);
        return response;
      }
    } catch (error) {
      console.log("error:", error);
      Warn(error);
      throw error;
    }
  }
);

export const campaignSlice = createSlice({
  name: "campaign",
  initialState: {
    addCampaignDetails: {
      loading: false,
      campaign: {},
      error: "",
    },
    getCampaigns: {
      loading: false,
      campaigns: [],
      error: "",
    },
    getCampaignbyId: {
      loading: false,
      campaignData: {},
      error: "",
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCampaign.pending, (state) => {
        state.addCampaignDetails.loading = true;
      })
      .addCase(createCampaign.fulfilled, (state, action) => {
        console.log("action.payload :-", action.payload);

        state.addCampaignDetails.loading = false;
        state.addCampaignDetails.campaign = action.payload.data;
      })
      .addCase(createCampaign.rejected, (state) => {
        state.addCampaignDetails.loading = false;
        state.addCampaignDetails.error = "Network Error !!!";
      })

      .addCase(getCampaignsData.pending, (state) => {
        state.getCampaigns.loading = true;
      })
      .addCase(getCampaignsData.fulfilled, (state, action) => {
        console.log("action.payload getCampaignsData :-", action.payload);
        state.getCampaigns.loading = false;
        state.getCampaigns.campaigns = action.payload;
      })
      .addCase(getCampaignsData.rejected, (state) => {
        state.getCampaigns.loading = false;
        state.getCampaigns.error = action.payload.error;
      })

      .addCase(getCampaignbyId.pending, (state) => {
        state.getCampaignbyId.loading = true;
      })
      .addCase(getCampaignbyId.fulfilled, (state, action) => {
        state.getCampaignbyId.loading = false;
        state.getCampaignbyId.campaignData = action.payload;
      })
      .addCase(getCampaignbyId.rejected, (state, action) => {
        state.getCampaignbyId.loading = false;
        state.getCampaignbyId.error = action.payload.error;
      });
  },
});

export default campaignSlice.reducer;
