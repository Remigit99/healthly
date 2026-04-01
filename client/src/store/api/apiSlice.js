import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from '../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_SERVER_URL || 'http://localhost:5000',
  prepareHeaders: (headers, { getState }) => {
    // Automatically grab the token from authSlice and stick it in the header
    const token = getState().auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // If we get a 401 (Expired Token), try to refresh it
  if (result?.error?.status === 401) {
    const refreshResult = await baseQuery('api/user/refresh', api, extraOptions);
    
    if (refreshResult?.data) {
      // Store the new token
      api.dispatch(setCredentials({ ...refreshResult.data }));
      // Retry the original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Appointment', 'Patient'], // Used for "auto-refreshing" data
  endpoints: (builder) => ({}), // We will "inject" endpoints here to keep files clean
});