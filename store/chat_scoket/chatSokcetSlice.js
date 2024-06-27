"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket as socketInstance } from "@/services/socket";

export const getUserList = createAsyncThunk("get-userList", async () => {
  try {
    const response = await new Promise((resolve, reject) => {
      socketInstance.emit("chat:getList", { isPrivate: true }, (response) => {
        if (response.error) {
          reject(response.error);
        } else {
          //console.log(response.data, "response getList");
          resolve(response.data);
        }
      });
    });
    return response;
  } catch (error) {
    console.error("Error while fetching user list:", error);
    throw error;
  }
});

///lastseen

export const getUserLastSeen = createAsyncThunk(
  "get-userLastSeen",
  async (payload) => {
    // console.log("payload last seen :-", payload);
    try {
      const response = await new Promise((resolve, reject) => {
        socketInstance.emit(
          "user:seenMessages",
          { chatId: payload.index },
          (response) => {
            if (response.error) {
              reject(response.error);
            } else {
              // console.log(response, "response lastseen");
              resolve(response);
            }
          }
        );
      });
      return response;
    } catch (error) {
      console.error("Error lastseen:", error);
      throw error;
    }
  }
);

// get message
export const getMessages = createAsyncThunk(
  "get-userGetMessages",
  async (payload) => {
    //console.log("payload get  meeesage :-", payload);
    try {
      const response = await new Promise((resolve, reject) => {
        socketInstance.emit(
          "chat:getMessages",
          { chatId: payload },
          (response) => {
            if (response.error) {
              reject(response.error);
            } else {
              //  console.log(response, "response message");
              resolve(response);
            }
          }
        );
      });
      return response;
    } catch (error) {
      console.error("Error getMessages :", error);
      throw error;
    }
  }
);

// get users List
export const fetchUserList = createAsyncThunk("users-getList", async () => {
  try {
    const response = await new Promise((resolve, reject) => {
      socketInstance.emit("users:getList", {}, (response) => {
        if (response.error) {
          //  console.log(response.error,"userslisterror")
          reject(response.error);
        } else {
          //   console.log(response.data, "response users:getList");
          resolve(response.data);
        }
      });
    });
    return response;
  } catch (error) {
    console.error("Error while fetching user list:", error);
    throw error;
  }
});

//chat add

export const addChat = createAsyncThunk("chat-addChat", async (payload) => {
  console.log("payload add chat", payload);
  try {
    const response = await new Promise((resolve, reject) => {
      socketInstance.emit(
        "chat:add",
        {
          members: payload.members,
          latestMessage: payload.latestMessage,
          isPrivate: payload.isPrivate,
          chatName: payload.chatName,
        },
        (response) => {
          if (response.error) {
            reject(response.error);
          } else {
            console.log(response, "response chat:add");
            resolve(response);
          }
        }
      );
    });
    return response;
  } catch (error) {
    console.error("Error while adding chat:", error);
    throw error;
  }
});

//get profile details

export const getProfileInfo = createAsyncThunk(
  "get-getProfileInfo",
  async (payload) => {
    // console.log("payload get  getProfileInfo :-", payload);
    try {
      const response = await new Promise((resolve, reject) => {
        socketInstance.emit(
          "user:getDetails",
          { userId: payload.userId, chatId: payload.chatId },
          (response) => {
            if (response.error) {
              reject(response.error);
            } else {
              // console.log(response, "response user:getDetails");
              resolve(response);
            }
          }
        );
      });
      return response;
    } catch (error) {
      console.error("Error getProfileInfo:", error);
      throw error;
    }
  }
);

//send msg

export const sendMessage = createAsyncThunk(
  "send-sendMessage",
  async (payload) => {
    console.log("payload get  sendMessage :-", payload);
    try {
      const response = await new Promise((resolve, reject) => {
        socketInstance.emit(
          "message:send",
          {
            room: payload.room,
            chatId: payload.chatId,
            message: payload.message,
            mediaContent: payload.mediaContent,
          },
          (response) => {
            if (response.error) {
              reject(response.error);
            } else {
              console.log(response, "response user:sendMessage");
              resolve(response);
            }
          }
        );
      });
      return response;
    } catch (error) {
      console.error("Error sendMessage:", error);
      throw error;
    }
  }
);

//delete msg

export const deleteMessage = createAsyncThunk(
  "del-deleteMessage",
  async (payload) => {
    console.log("payload   deleteMessage :-", payload);
    try {
      const response = await new Promise((resolve, reject) => {
        socketInstance.emit(
          "chat:deleteMessage",
          {
            messageId: payload.messageId,
          },
          (response) => {
            if (response.error) {
              reject(response.error);
            } else {
              console.log(response, "response deleteMessage");
              resolve(response);
            }
          }
        );
      });
      return response;
    } catch (error) {
      console.error("Error deleteMessage:", error);
      throw error;
    }
  }
);

//get notification
export const getnotification = createAsyncThunk(
  "get-notification",
  async (payload) => {
    try {
      const response = await new Promise((resolve, reject) => {
        socketInstance.emit("notification:getList", {}, (response) => {
          if (response.error) {
            reject(response.error);
          } else {
            console.log(response, "response notification");
            resolve(response);
          }
        });
      });
      return response;
    } catch (error) {
      console.error("Error notification:", error);
      throw error;
    }
  }
);

//
//read all notifications

export const readAllNotification = createAsyncThunk(
  "read-notifications",
  async (payload) => {
    try {
      const response = await new Promise((resolve, reject) => {
        socketInstance.emit("notification:readAll", {}, (response) => {
          if (response.error) {
            reject(response.error);
          } else {
            console.log(response, "notification:readAll");
            resolve(response);
          }
        });
      });
      return response;
    } catch (error) {
      console.error("Error notification:readAll:", error);
      throw error;
    }
  }
);

//

export const chatSokcetSlice = createSlice({
  name: "chatRequest",
  initialState: {
    chatUsersList: {
      loading: false,
      usersList: [],
      error: null,
    },

    chatUsersMeesages: {
      loading: false,
      userMessages: [],
      error: null,
    },
    chatsendMessage: {
      loading: false,
      messageSend: {},
      error: null,
    },
    chatAdd: {
      loading: false,
      chat: null,
      error: null,
    },
    usersList: {
      loading: false,
      list: [],
      error: null,
    },
    userNotifications: {
      loading: false,
      notificationInfo: {},
      error: null,
    },
  },
  reducers: {
    resetCurrentMessageData: (state) => {
      state.chatsendMessage.messageSend = {};
    },
    resetNotificationData: (state) => {
      state.userNotifications.notificationInfo = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserList.pending, (state) => {
        state.chatUsersList.loading = true;
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.chatUsersList.loading = false;
        state.chatUsersList.usersList = action.payload;
      })
      .addCase(getUserList.rejected, (state, action) => {
        state.chatUsersList.loading = false;
        state.chatUsersList.error = action.payload?.message;
      })
      .addCase(getMessages.pending, (state) => {
        state.chatUsersMeesages.loading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.chatUsersMeesages.loading = false;
        state.chatUsersMeesages.userMessages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.chatUsersMeesages.loading = false;
        state.chatUsersMeesages.error = action.payload?.message;
      })
      .addCase(sendMessage.pending, (state) => {
        state.chatsendMessage.loading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.chatsendMessage.loading = false;
        state.chatsendMessage.messageSend = action.payload;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.chatsendMessage.loading = false;
        state.chatsendMessage.error = action.payload?.message;
      })
      .addCase(addChat.pending, (state) => {
        state.chatAdd.loading = true;
      })
      .addCase(addChat.fulfilled, (state, action) => {
        state.chatAdd.loading = false;
        state.chatAdd.chat = action.payload;
      })
      .addCase(addChat.rejected, (state, action) => {
        state.chatAdd.loading = false;
        state.chatAdd.error = action.payload?.message;
      })
      .addCase(fetchUserList.pending, (state) => {
        state.usersList.loading = true;
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.usersList.loading = false;
        state.usersList.list = action.payload;
      })
      .addCase(fetchUserList.rejected, (state, action) => {
        state.usersList.loading = false;
        state.usersList.error = action.payload?.message;
      })
      .addCase(getnotification.pending, (state) => {
        state.userNotifications.loading = true;
      })
      .addCase(getnotification.fulfilled, (state, action) => {
        console.log("action noti :-", action.payload);
        state.userNotifications.loading = false;
        state.userNotifications.notificationInfo = action.payload;
      })
      .addCase(getnotification.rejected, (state, action) => {
        state.userNotifications.loading = false;
        state.userNotifications.error = action.payload;
      });
  },
});

export default chatSokcetSlice.reducer;
export const { resetCurrentMessageData, resetNotificationData } =
  chatSokcetSlice.actions;
