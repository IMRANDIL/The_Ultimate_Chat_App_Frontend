import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, register } from "../services/api";

interface User {
  // Define your user object type here
  // Based on your API response structure
  id: string;
  email: string;
  // Add more properties as needed
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null | undefined;
}

// Define your initial state
const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

// Define an asynchronous thunk for login
export const loginAsync = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    const response = await login(email, password);
    return response.data;
  }
);

// Define an asynchronous thunk for register
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
    const response = await register(email, password, username);
    return response.data;
  }
);

// Create the auth slice with reducers and extraReducers
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducer cases for loginAsync
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      });

    // Add reducer cases for registerAsync
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
        state.error = action.error.message ?? null;
      });
  },
});

export default authSlice.reducer;
