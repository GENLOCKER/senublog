/** @format */
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

import { initialState } from "../initialState";
import { RootState } from "../store";

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState.auth,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    // Update the setAuth reducer
    setAuth: (state, { payload }) => {
      state.isAuthenticated = true;
      state.user = payload.user;
      state.token = payload.token;
      Cookies.set(
        "auth",
        JSON.stringify({
          accessToken: payload.token, // Changed from token to accessToken
          user: payload.user,
        }),
        {
          secure: true,
          expires: payload.rememberMe ? 14 : undefined,
        }
      );
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null as any;

      Cookies.remove("auth");
      localStorage.removeItem("persist:root");
      localStorage.clear();
    },
  },
});

export const authSelector = (state: RootState) => state.auth;

export const { setUser, setAuth, logout } = authSlice.actions;

export default authSlice.reducer;
