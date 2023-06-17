import {
  createSlice,
  createAsyncThunk,
  combineReducers,
} from "@reduxjs/toolkit";
import { createChat, fetchChats } from "../services/api";

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
interface chatState {
  _id?: string;
  selectedParticipants: Participant[];
  fetchChats: Participant[];
  isLoading: boolean;
  error: string | null;
  msg?: string | null;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

const initialState: chatState = {
  selectedParticipants: [],
  fetchChats: [],
  isLoading: false,
  error: null,
  msg: null,
};

export const createChatAsync = createAsyncThunk(
  "chat/createChat",
  async ({ participantId }: { participantId: string }) => {
    try {
      const response = await createChat(participantId);
      return response;
    } catch (error: any) {
      throw error;
    }
  }
);

export const fetchChatsAsync = createAsyncThunk("chat/fetchChat", async () => {
  try {
    const response = await fetchChats();
    return response;
  } catch (error: any) {
    throw error;
  }
});

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createChatAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createChatAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedParticipants = action.payload;
        // localStorage.setItem("chatInfo", JSON.stringify(action.payload));
      })
      .addCase(createChatAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });

    builder
      .addCase(fetchChatsAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchChatsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fetchChats = action.payload;
        // localStorage.setItem("chatInfo", JSON.stringify(action.payload));
      })
      .addCase(fetchChatsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });
  },
});

const rootReducer = combineReducers({
  chat: chatSlice.reducer,
});

export default rootReducer;
