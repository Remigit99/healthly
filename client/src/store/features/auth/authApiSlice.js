// src/features/auth/authApiSlice.js
import { apiSlice } from "../../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/api/user/login',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/api/user/register',
        method: 'POST',
        body: { ...userData },
      }),
    }),
    // Verify this is inside the endpoints object
    verifyEmail: builder.mutation({
      query: (token) => ({
        url: `/api/user/verify-email/${token}`,
        method: 'PATCH',
        body: {}
      }),
    }),
  }),
  overrideExisting: true, // for if the HMR (Hot Module Replacement) is glitching
});

export const { 
  useLoginMutation, 
  useRegisterMutation, 
  useVerifyEmailMutation 
} = authApiSlice;
