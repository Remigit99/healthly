import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    selectedChildId: null, // For parents to track which child is active
    isAuthenticated: false,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
      state.isAuthenticated = true;
    },
    setSelectedChildId: (state, action) => {
      state.selectedChildId = action.payload;
    },

    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.selectedChildId = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logOut, setSelectedChildId } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectSelectedChildId = (state) => state.auth.selectedChildId;
