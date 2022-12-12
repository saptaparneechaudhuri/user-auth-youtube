import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} from "./authActions";

// Get user from the local storage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  loading: false,
  error: false,
  success: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.success = false;
      state.error = false;
      state.message = false;
    },
    googleLogIn: (state, action) => {
      state.user = action.payload;
      state.success = true;
    },

    logout: (state) => {
      localStorage.removeItem("user");
      state.loading = false;
      state.user = null;
      state.error = false;
      state.success = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.user = null;
        state.message = action.payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.user = null;
        state.message = action.payload;
      });
  },
});

export const { reset, logout, googleLogIn } = authSlice.actions;

export default authSlice.reducer;
