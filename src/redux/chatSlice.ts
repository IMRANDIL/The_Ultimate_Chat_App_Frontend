import {
  createSlice,
  createAsyncThunk,
  combineReducers,
} from "@reduxjs/toolkit";
import {
  addToGroupChat,
  createChat,
  createGroupChat,
  fetchChats,
  renameGroupChat,
} from "../services/api";

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
  fetchGroupChats: Participant[];
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
  fetchGroupChats: [],
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

export const createGroupChatAsync = createAsyncThunk(
  "chat/createGroupChat",
  async ({ name, participants }: { name: string; participants: [] }) => {
    try {
      const response = await createGroupChat(name, participants);
      return response;
    } catch (error: any) {
      throw error;
    }
  }
);

export const renameChatGroupAsync = createAsyncThunk(
  "chat/renameChatGroup",
  async ({ chatId, chatName }: { chatId: string; chatName: string }) => {
    try {
      const response = await renameGroupChat(chatId, chatName);
      return response;
    } catch (error: any) {
      throw error;
    }
  }
);

export const addToChatGroupAsync = createAsyncThunk(
  "chat/addToChatGroup",
  async ({
    chatId,
    participantId,
  }: {
    chatId: string;
    participantId: string;
  }) => {
    try {
      const response = await addToGroupChat(chatId, participantId);
      return response;
    } catch (error: any) {
      throw error;
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    clearStore: (state) => {
      state.fetchChats = [];
      state.selectedParticipants = [];
      state.msg = "";
      state.error = null;
      localStorage.removeItem("selectedChat");
      localStorage.removeItem("selectedGroupChat");
    },
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

    builder
      .addCase(createGroupChatAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createGroupChatAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fetchGroupChats = action.payload;
        // localStorage.setItem("chatInfo", JSON.stringify(action.payload));
      })
      .addCase(createGroupChatAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });

    builder
      .addCase(renameChatGroupAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(renameChatGroupAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fetchGroupChats = action.payload;
        // localStorage.setItem("chatInfo", JSON.stringify(action.payload));
      })
      .addCase(renameChatGroupAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });

    builder
      .addCase(addToChatGroupAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToChatGroupAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fetchGroupChats = action.payload;
        // localStorage.setItem("chatInfo", JSON.stringify(action.payload));
      })
      .addCase(addToChatGroupAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });
  },
});
export const { clearStore } = chatSlice.actions;

const rootReducer = combineReducers({
  chat: chatSlice.reducer,
});

export default rootReducer;
