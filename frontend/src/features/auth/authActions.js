import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const setUserInLocalStorage = (data) => {
  localStorage.setItem("user", JSON.stringify(data));
};

export const registerUser = createAsyncThunk(
  "auth/signup",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`/api/v1/users/signup`, userData);
      if (response.data) {
        setUserInLocalStorage(response.data);
        return response.data;
      }
    } catch (err) {
      const message =
        (err.response && err.response.data.message) || err.message;

      // rejectWithValue sends the error message as a payload
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`/api/v1/users/login`, userData);
      if (response.data) {
        setUserInLocalStorage(response.data);
        return response.data;
      }
    } catch (err) {
      const message =
        (err.response && err.response.data.message) || err.message;

      // rejectWithValue sends the error message as a payload
      return thunkAPI.rejectWithValue(message);
    }
  }
);
