import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { POST } from "@/services/methods";

export const signUpUser = createAsyncThunk("sign-up", async (payload) => {
  try {
    const response = await POST("auth/sign-up", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
});
