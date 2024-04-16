import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { POST } from "@/services/methods";
import { useToastMessages } from "@/components/lib/messages/useToastMessages";

export const signUpUser = createAsyncThunk("sign-up", async (payload) => {
  try {
    const response = await POST("auth/sign-up", payload);
    return response;
  } catch (error) {
    throw error;
  }
});
