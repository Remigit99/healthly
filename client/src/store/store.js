import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import authReducer from './features/auth/authSlice';

export const store = configureStore({
  reducer: {
    // The API slice generates its own reducer dynamically
    [apiSlice.reducerPath]: apiSlice.reducer,
    // Your manual auth slice for "Wallet" storage
    auth: authReducer,
  },
  // Middleware is REQUIRED for RTK Query to handle caching and invalidation
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true, // Useful for debugging in Chrome
});