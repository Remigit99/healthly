import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import authReducer from './features/auth/authSlice';
import {persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';
// import storageSession from 'redux-persist/lib/storage/session';
  

const customSessionStorage = {
  getItem: (key) => {
    return Promise.resolve(localStorage.getItem(key));
  },
  setItem: (key, value) => {
    return Promise.resolve(localStorage.setItem(key, value));
  },
  removeItem: (key) => {
    return Promise.resolve(localStorage.removeItem(key));
  },
};

const persistConfig = {
  key: 'root',
  version: 1,
  // storage: customStorage,
  storage: customSessionStorage,
  // whitelist: ['auth'], // Only persist the auth slice
  whitelist: ['auth']
};

const rootReducer = combineReducers({
  auth: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer, // Add the API slice reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  // Middleware is REQUIRED for RTK Query to handle caching and invalidation
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(
      {
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }
    ).concat(apiSlice.middleware),
  devTools: true, // Useful for debugging in Chrome
});

export const persistor = persistStore(store);