import { useToastMessages } from "@/components/lib/messages/useToastMessages";
import { POST, GET } from "@/services/methods";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const { Success, Warn, Error } = useToastMessages();

export const getCampaignRequest = createAsyncThunk(
  "get-campaignRequest",
  async (payload) => {
    try {
      const response = await POST("campaign-request", {
        campaignId: payload.campaignId,
        requestStatus: payload.requestStatus,
        page: payload.page,
        pageSize: payload.pageSize,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getUploadedContent = createAsyncThunk(
  "get-uploaded-content",
  async (payload) => {
    try {
      const response = await POST("campaign/get-uploaded-content", {
        campaignId: payload.campaignId,
        contentStatus: payload.requestStatus,
        page: payload.page,
        pageSize: payload.pageSize,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getCampaignIssuesbyId = createAsyncThunk(
  "get-campaignIssuebyId",
  async (payload) => {
    try {
      const response = await GET(
        `campaign-request/get-issue?page=${payload.page}&pageSize=${payload.pageSize}&campaignId=${payload.campaignId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const campaignApproveReject = createAsyncThunk(
  "campaign-approve-reject-by-brand",
  async (payload) => {
    try {
      const response = await POST(
        "campaign-request/campaign-approval-by-brand",
        {
          campaignRequestId: payload.campaignId,
          status: payload.status,
        }
      );
      if (response.success) {
        Success(response.message);
        return response;
      } else {
        Error(response.message);
        return response;
      }
    } catch (error) {
      Error(error.message);
      console.log(error)
    }
  }
);

export const contentApprovebyBrand = createAsyncThunk(
  "content-approve-reject-by-brand",
  async (payload) => {
    try {
      const response = await POST(
        "campaign/approve-content",
        {
          contentId: payload.contentId,
          status: payload.status,
          rejectMessage: payload.rejectMessage,
        }
      );
      // return response.data;
      if (response.success) {
        Success(response.message);
        return response;
      } else {
        Error(response.message);
        return response;
      }
    } catch (error) {
      Error(error.message);
      throw error;
    }
  }
);

export const contentIsFavoritebyBrand = createAsyncThunk(
  "content-is-favorite-by-brand",
  async (payload) => {
    console.log("Favorite into payload:-", payload);
    try {
      const response = await POST(
        "campaign-request/like-campaign-request",
        {
          campaignRequestId: payload.campaignRequestId,
          isFavorite: payload.isFavorite
        }
      );
      // return response.data;
      if (response.success) {
        Success(response.message);
        return response;
      } else {
        Error(response.message);
        return response;
      }
    } catch (error) {
      Error(error.message);
      throw error;
    }
  }
)

export const likeDislikeContent = createAsyncThunk(
  "like-dislike-content",
  async (payload) => {
    try {
      const response = await POST(
        "campaign/like-uploaded-content",
        {
          contentId: payload.contentId,
        }
      );
      // return response.data;
      if (response.success) {
        return response;
      } else {
        return response;
      }
    } catch (error) {
      Error(error.message);
      throw error;
    }
  }
);

export const allOrderShippedinBulk = createAsyncThunk(
  "all-order-shipped-in-bulk",
  async (payload) => {
    try {
      const response = await POST(
        "campaign-request/update-shipping-status-bulk",
        { campaignId: payload.campaignId }
      );
      console.log("response:-", response);
      if (response.success) {
        Success(response.message);
        return response;
      } else {
        Error(response.message);
        return response;
      }
    } catch (error) {
      Error(error.message);
      console.log(error);
    }
  }
);

export const oneOrderShipped = createAsyncThunk(
  "one-order-shipped",
  async (payload) => {
    console.log("payload:-", payload);
    try {
      const response = await POST("/campaign-request/update-shipping-status", {
        campaignRequestId: payload.campaignRequestId,
      });
      console.log("response:-", response);
      if (response.success) {
        Success(response.message);
        return response;
      } else {
        Error(response.message);
        return response;
      }
    } catch (error) {
      Error(error.message);
      console.log(error);
    }
  }
);

export const getCampaignRequestByCreator = createAsyncThunk(
  "get-campaignRequestByCreator",
  async (payload) => {
    console.log("payload:-", payload);
    try {
      const response = await POST(
        "campaign-request/campaign-request-by-creator",
        payload
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Todo-table into issue form Post API
export const postTodoIssueByCreator = createAsyncThunk(
  "add-todoIssueByCreator",
  async (payload) => {
    // console.log("payload postTodoIssueByCreator :-", payload);
    try {
      const response = await POST("campaign-request/raise-issue", payload);

      if (response.success) {
        Success(response.message);
        return response;
      }
      else {
        Warn("Error occurred while creating Issue");
        return response;
      }
    } catch (error) {
      Warn(error);
      throw error;
    }
  }
)

// Content submitted table form POST API
export const postContentSubmittedByCreator = createAsyncThunk(
  "add-contentSubmittedByCreator",
  async (payload) => {
    // console.log("payload postContentSubmittedByCreator :-", payload);
    try {
      const response = await POST("campaign/upload-content", payload);

      if (response.success) {
        Success(response.message);
        return response;
      }
      else {
        Warn("Error occurred while creating submitted");
        return response;
      }
    }
    catch (error) {
      Warn(error);
      throw error;
    }
  }
)

// Addd Posted Content Link from POST API
export const postContentLinkByCreator = createAsyncThunk(
  "add-contentLinkByCreator",
  async (payload) => {
    // console.log("payload postContentLinkByCreator :-", payload);
    try {
      const response = await POST("campaign/save-posted-content", payload);

      if (response.success) {
        Success(response.message);
        return response;
      }
      else {
        Warn("Error occurred while creating submitted");
        return response;
      }

    }
    catch (error) {
      Warn(error);
      throw error;
    }
  }
)

// Issue table form POST API
export const getCreatorIssuesbyId = createAsyncThunk(
  "get-creatorIssuesbyId",
  async (payload) => {
    try {
      const response = await GET(
        `campaign-request/get-issue-creator?page=${payload.page}&pageSize=${payload.pageSize}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);


// Setting form Post API
export const postCampaignByCreator = createAsyncThunk(
  "add-campaignByCreator",
  async (payload) => {
    // console.log("payload postCampaignByCreator :-", payload);
    try {
      const response = await POST("user/edit-profile-details", payload);

      if (response.success) {
        Success(response.message);
        return response;
      } else {
        Warn("Error occurred while creating creator profile");
        return response;
      }
    } catch (error) {
      Warn(error);
      throw error;
    }
  }
);

// Setting Form Get API
export const getCreatorProfileByCreator = createAsyncThunk(
  "get-creatorProfileByCreator",
  async (payload) => {
    try {
      const response = await GET("user/profile-details");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
)

// view brief id based on
export const getCampaignCreatorbyId = createAsyncThunk(
  "get-campaignCreatorbyId",
  async (payload) => {
    try {
      const response = await GET(
        `campaign/get-campaign-by-id?campaignId=${payload.campaignId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// campaign request by creator approval or reject
export const optionCampaignRequestByCreator = createAsyncThunk(
  "post-campaignRequestByCreator",
  async (payload) => {
    // console.log("payload postCampaignByCreator :-", payload);
    try {
      const response = await POST(
        "campaign-request/campaign-approval",
        payload
      );

      if (response.success) {
        Success(response.message);
        return response;
      } else {
        // Warn("Error occurred while creating creator profile");
        return response;
      }
    } catch (error) {
      Warn(error);
      throw error;
    }
  }
);

export const campaignRequestSlice = createSlice({
  name: "campaignRequest",
  initialState: {
    campaignRequest: {
      loading: false,
      campaignRequestData: [],
      error: null,
    },
    campaignRequestByCreator: {
      loading: false,
      campaignRequestByCreatorData: [],
      error: null,
    },
    campaignTodoIssuesByCreator: {
      loading: false,
      campaignTodoIssuesByCreatorData: [],
      error: null,
    },
    campaignContentSubmittedByCreator: {
      loading: false,
      campaignContentSubmittedByCreatorData: [],
      error: null,
    },
    campainContentLinkbyCreator: {
      loading: false,
      campainContentLinkbyCreatorData: [],
      error: null,
    },
    campaignIssueByCreator: {
      loading: false,
      campaignIssueByCreatorData: [],
      error: null,
    },
    addCampaignByCreator: {
      loading: false,
      addCampaignByCreatorData: {},
      error: null,
    },
    getCreatorProfileByCreator: {
      loading: false,
      getCreatorProfileByCreatorData: {},
      error: null,
    },
    getCampaignCreatorbyId: {
      loading: false,
      getCampaignCreatorbyIdAllData: {},
      error: "",
    },
    optionCampaignRequestByCreator: {
      loading: false,
      optionCampaignRequestByCreatorData: {},
      error: "null",
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
      .addCase(getCampaignRequest.rejected, (state, action) => {
        console.log(action, "action");
        state.campaignRequest.loading = false;
        state.campaignRequest.error = action.payload?.message;
      })

      .addCase(getCampaignIssuesbyId.pending, (state) => {
        state.campaignRequest.loading = true;
      })
      .addCase(getCampaignIssuesbyId.fulfilled, (state, action) => {
        state.campaignRequest.loading = false;
        state.campaignRequest.campaignRequestData = action.payload;
      })
      .addCase(getCampaignIssuesbyId.rejected, (state, action) => {
        console.log(action, "action");
        state.campaignRequest.loading = false;
        state.campaignRequest.error = action.payload.message;
      })
      .addCase(getCreatorIssuesbyId.pending, (state) => {
        state.campaignIssueByCreator.loading = true;
      })
      .addCase(getCreatorIssuesbyId.fulfilled, (state, action) => {
        state.campaignIssueByCreator.loading = false;
        state.campaignIssueByCreator.campaignIssueByCreatorData =
          action.payload;
      })
      .addCase(getCreatorIssuesbyId.rejected, (state, action) => {
        state.campaignIssueByCreator.loading = false;
        state.campaignIssueByCreator.error = action.payload?.message;
      })
      .addCase(getUploadedContent.pending, (state) => {
        state.campaignRequest.loading = true;
      })
      .addCase(getUploadedContent.fulfilled, (state, action) => {
        state.campaignRequest.loading = false;
        state.campaignRequest.campaignRequestData = action.payload;
      })
      .addCase(getUploadedContent.rejected, (state, action) => {
        console.log(action, "action");
        state.campaignRequest.loading = false;
        state.campaignRequest.error = action.payload.message;
      })
      .addCase(postContentLinkByCreator.pending, (state) => {
        state.campainContentLinkbyCreator.loading = true;
      })
      .addCase(postContentLinkByCreator.fulfilled, (state, action) => {
        state.campainContentLinkbyCreator.loading = false;
        state.campainContentLinkbyCreator.campainContentLinkbyCreatorData =
          action.payload;
      })
      .addCase(postContentLinkByCreator.rejected, (state, action) => {
        state.campainContentLinkbyCreator.loading = false;
        state.campainContentLinkbyCreator.error =
          action.payload?.errorMessage;
      })
      .addCase(getCampaignRequestByCreator.pending, (state) => {
        state.campaignRequestByCreator.loading = true;
      })
      .addCase(getCampaignRequestByCreator.fulfilled, (state, action) => {
        console.log("Creator of action.payload :-", action.payload);
        state.campaignRequestByCreator.loading = false;
        state.campaignRequestByCreator.campaignRequestByCreatorData =
          action.payload;
      })
      .addCase(getCampaignRequestByCreator.rejected, (state, action) => {
        state.campaignRequestByCreator.loading = false;
        state.campaignRequestByCreator.error = action.payload?.errorMessage;
      })
      .addCase(postTodoIssueByCreator.pending, (state) => {
        state.campaignTodoIssuesByCreator.loading = true;
      })
      .addCase(postTodoIssueByCreator.fulfilled, (state, action) => {
        state.campaignTodoIssuesByCreator.loading = false;
        state.campaignTodoIssuesByCreator.campaignTodoIssuesByCreatorData =
          action.payload;
      })
      .addCase(postTodoIssueByCreator.rejected, (state, action) => {
        state.campaignTodoIssuesByCreator.loading = false;
        state.campaignTodoIssuesByCreator.error = action.payload?.message;
      })
      .addCase(postContentSubmittedByCreator.pending, (state) => {
        state.campaignContentSubmittedByCreator.loading = true;
      })
      .addCase(postContentSubmittedByCreator.fulfilled, (state, action) => {
        state.campaignContentSubmittedByCreator.loading = false;
        state.campaignContentSubmittedByCreator.campaignContentSubmittedByCreatorData =
          action.payload;
      })
      .addCase(postContentSubmittedByCreator.rejected, (state, action) => {
        state.campaignContentSubmittedByCreator.loading = false;
        state.campaignContentSubmittedByCreator.error = action.payload?.message;
      })
      .addCase(postCampaignByCreator.pending, (state) => {
        state.addCampaignByCreator.loading = true;
      })
      .addCase(postCampaignByCreator.fulfilled, (state, action) => {
        state.addCampaignByCreator.loading = false;
        state.addCampaignByCreator.addCampaignByCreatorData = action.payload;
      })
      .addCase(postCampaignByCreator.rejected, (state, action) => {
        state.addCampaignByCreator.loading = false;
        state.addCampaignByCreator.error = action.payload.message;
      })
      .addCase(getCreatorProfileByCreator.pending, (state) => {
        state.getCreatorProfileByCreator.loading = true;
      })
      .addCase(getCreatorProfileByCreator.fulfilled, (state, action) => {
        state.getCreatorProfileByCreator.loading = false;
        state.getCreatorProfileByCreator.getCreatorProfileByCreatorData =
          action.payload;
      })
      .addCase(getCreatorProfileByCreator.rejected, (state, action) => {
        state.getCreatorProfileByCreator.loading = false;
        state.getCreatorProfileByCreator.error = action.payload?.message;
      })
      .addCase(getCampaignCreatorbyId.pending, (state) => {
        state.getCampaignCreatorbyId.loading = true;
      })
      .addCase(getCampaignCreatorbyId.fulfilled, (state, action) => {
        state.getCampaignCreatorbyId.loading = false;
        state.getCampaignCreatorbyId.getCampaignCreatorbyIdAllData =
          action.payload;
      })
      .addCase(getCampaignCreatorbyId.rejected, (state, action) => {
        state.getCampaignCreatorbyId.loading = false;
        state.getCampaignCreatorbyId.error = action.payload.message;
      })
      .addCase(optionCampaignRequestByCreator.pending, (state) => {
        state.optionCampaignRequestByCreator.loading = true;
      })
      .addCase(optionCampaignRequestByCreator.fulfilled, (state, action) => {
        state.optionCampaignRequestByCreator.loading = false;
        state.optionCampaignRequestByCreator.optionCampaignRequestByCreatorData =
          action.payload;
      })
      .addCase(optionCampaignRequestByCreator.rejected, (state, action) => {
        state.optionCampaignRequestByCreator.loading = false;
        state.optionCampaignRequestByCreator.error =
          action.payload.errorMessage;
      });
  },
});

export default campaignRequestSlice.reducer;
