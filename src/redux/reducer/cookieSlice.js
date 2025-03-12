import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hasAcceptedCookies: false,
  acceptedAt: null,
};

const cookieSlice = createSlice({
  name: "cookies",
  initialState,
  reducers: {
    acceptCookies: (state) => {
      state.hasAcceptedCookies = true;
      state.acceptedAt = Date.now();
    },
    resetCookies: (state) => {
      state.hasAcceptedCookies = false;
      state.acceptedAt = null;
    },
  },
});

export const { acceptCookies, resetCookies } = cookieSlice.actions;
export default cookieSlice.reducer;
