"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { socket as socketInstance } from "@/services/socket";

const appSocketMessages = {
  connectionStatus: {
    pending: "CONNECTING",
    fulfilled: "CONNECTED",
    rejected: "CONNECTION_FAILED",
  },
  disconnectionStatus: {
    pending: "DISCONNECTING",
    fulfilled: "DISCONNECTED",
    rejected: "DISCONNECTION_FAILED",
  },
  userListStatus: {
    pending: "FETCHING_USER_LIST",
    fulfilled: "USER_LIST_FETCHED",
    rejected: "FETCH_USER_LIST_FAILED",
  },
};
export const getConnectionStatus = ({ state }) => state.app.connectionStatus;

// export const connectToSocket = createAsyncThunk(
//   "connectToSocket",
//   async function (payload) {
//     console.log("i am call appSlice");
//     return await socketInstance.connect(payload);
//   }
// );

export const connectToSocket = createAsyncThunk(
  "socket/connect",
  async (token, { rejectWithValue }) => {
    try {
      return await socketInstance
        .connect(token)
        .then(() => {
          socketInstance.listenForMessages();
        })
        .catch((error) => {
          console.error("Socket connection failed:", error);
        });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const disconnectFromSocket = createAsyncThunk(
  "disconnectFromSocket",
  async () => {
    try {
      return await socketInstance.disconnect();
    } catch (error) {
      return error;
    }
  }
);

const appSlice = createSlice({
  name: "appRequest",
  initialState: {
    connectionStatus: appSocketMessages.connectionStatus.rejected,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(connectToSocket.pending, (state) => {
      state.connectionStatus = appSocketMessages.connectionStatus.pending;
    });
    builder.addCase(connectToSocket.fulfilled, (state) => {
      state.connectionStatus = appSocketMessages.connectionStatus.fulfilled;
    });
    builder.addCase(connectToSocket.rejected, (state) => {
      state.connectionStatus = appSocketMessages.connectionStatus.rejected;
    });
    builder.addCase(disconnectFromSocket.pending, (state) => {
      state.connectionStatus = appSocketMessages.disconnectionStatus.pending;
    });
    builder.addCase(disconnectFromSocket.fulfilled, (state) => {
      state.connectionStatus = appSocketMessages.disconnectionStatus.fulfilled;
    });
    builder.addCase(disconnectFromSocket.rejected, (state) => {
      state.connectionStatus = appSocketMessages.disconnectionStatus.rejected;
    });
  },
});
export default appSlice.reducer;
