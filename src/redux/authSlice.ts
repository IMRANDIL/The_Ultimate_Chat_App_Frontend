import {
  createSlice,
  createAsyncThunk,
  combineReducers,
} from "@reduxjs/toolkit";
import {
  forgotPassword,
  getAllUser,
  login,
  register,
  resetPassword,
} from "../services/api";

interface User {
  id: string;
  email: string;
  username: string;
  refreshToken: string;
  accessToken: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  msg?: string | null;
  users?: Array<any> | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  msg: null,
  users: null,
};

export const loginAsync = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await login(email, password);
      return response;
    } catch (error: any) {
      throw error;
    }
  }
);

export const registerAsync = createAsyncThunk(
  "auth/register",
  async ({
    email,
    password,
    username,
  }: {
    email: string;
    password: string;
    username: string;
  }) => {
    try {
      const response = await register(email, password, username);
      return response;
    } catch (error: any) {
      throw error;
    }
  }
);

export const forgotPasswordAsync = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email }: { email: string }) => {
    try {
      const response = await forgotPassword(email);
      return response;
    } catch (error: any) {
      throw error;
    }
  }
);

export const resetPasswordAsync = createAsyncThunk(
  "auth/resetPassword",
  async ({
    newPassword,
    resetToken,
  }: {
    newPassword: string;
    resetToken: string;
  }) => {
    try {
      const response = await resetPassword(newPassword, resetToken);
      return response;
    } catch (error: any) {
      throw error;
    }
  }
);

export const getAllUserAsync = createAsyncThunk(
  "auth/allUser",
  async ({ accessToken }: { accessToken: string }) => {
    try {
      const response = await getAllUser(accessToken);
      console.log(response);

      return response;
    } catch (error: any) {
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      localStorage.removeItem("userInfo");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });

    builder
      .addCase(registerAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });

    builder
      .addCase(forgotPasswordAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPasswordAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.msg = action.payload;
      })
      .addCase(forgotPasswordAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });

    builder
      .addCase(resetPasswordAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.msg = action.payload;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });

    builder
      .addCase(getAllUserAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.users = action.payload;
      })
      .addCase(getAllUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.error);
        state.error = action.error.message as string;
      });
  },
});

export const { logout, clearError } = authSlice.actions;

const rootReducer = combineReducers({
  auth: authSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
