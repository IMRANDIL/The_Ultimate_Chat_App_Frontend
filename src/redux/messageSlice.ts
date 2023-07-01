import {
  createSlice,
  createAsyncThunk,
  combineReducers,
} from "@reduxjs/toolkit";
import { fetchAllMessage, sendMessage } from "../services/api";

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
  fetchNewMessages: Participant[];
  fetchAllMessages: Participant[];
  isLoading: boolean;
  error: string | null;
  msg?: string | null;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

const initialState: messageState = {
  fetchNewMessages: [],
  fetchAllMessages: [],
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

export const fetchAllMessageAsync = createAsyncThunk(
  "message/fetchAllMessage",
  async ({ chatId }: { chatId: string }) => {
    try {
      const response = await fetchAllMessage(chatId);
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
        state.fetchNewMessages = action.payload;
      })
      .addCase(sendMessageAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });

    builder
      .addCase(fetchAllMessageAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllMessageAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fetchAllMessages = action.payload;
      })
      .addCase(fetchAllMessageAsync.rejected, (state, action) => {
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
