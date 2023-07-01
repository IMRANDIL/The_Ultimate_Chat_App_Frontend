import {
  createSlice,
  createAsyncThunk,
  combineReducers,
} from "@reduxjs/toolkit";
import { sendMessage } from "../services/api";

interface Participant {
  _id: string;
  email: string;
  username: string;
  profilePic: string;
  ipAddress: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface messageState {
  _id?: string;
  fetchmessages: Participant[];
  isLoading: boolean;
  error: string | null;
  msg?: string | null;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

const initialState: messageState = {
  fetchmessages: [],
  isLoading: false,
  error: null,
  msg: null,
};

export const sendMessageAsync = createAsyncThunk(
  "message/sendMessage",
  async ({ chatId, content }: { chatId: string; content: string }) => {
    try {
      const response = await sendMessage(chatId, content);
      return response;
    } catch (error: any) {
      throw error;
    }
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    clearStore: (state) => {
      state.msg = "";
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessageAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendMessageAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fetchmessages = action.payload;
      })
      .addCase(sendMessageAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });
  },
});
export const { clearStore } = messageSlice.actions;

const rootReducer = combineReducers({
  message: messageSlice.reducer,
});

export default rootReducer;
