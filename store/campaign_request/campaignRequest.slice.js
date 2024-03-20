import { POST } from "@/services/methods";

export const getCampaignRequest = createAsyncThunk(
  "get-campaignRequest",
  async (payload) => {
    try {
      const response = await POST(
        "campaign-request",{
          campaignId: payload.campaignId,
          requestStatus: payload.requestStatus
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const campaignRequestSlice = {
  name: "campaignRequest",
  initialState: {
    campaignRequest: {
      loading: false,
      campaignRequestData: [],
      error: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCampaignRequest.pending, (state) => {
        state.campaignRequest.loading = true;
      })
      .addCase(getCampaignRequest.fulfilled, (state, action) => {
        state.campaignRequest.loading = false;
        state.campaignRequest.campaignRequestData = action.payload;
      })
      .addCase(getCampaignRequest.rejected, (state) => {
        state.campaignRequest.loading = false;
        state.campaignRequest.error = action.payload.errorMessage;
      });
  },
};
