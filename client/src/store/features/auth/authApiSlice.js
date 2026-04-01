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
  overrideExisting: true, // This helps if the HMR (Hot Module Replacement) is glitching
});

// CAREFUL: The name MUST match the key above + Mutation
export const { 
  useLoginMutation, 
  useRegisterMutation, 
  useVerifyEmailMutation 
} = authApiSlice;

// import { apiSlice } from "../../api/apiSlice";

// export const authApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     login: builder.mutation({
//       query: (credentials) => ({
//         url: '/api/user/login',
//         method: 'POST',
//         body: { ...credentials },
//       }),
//     }),
//     register: builder.mutation({
//       query: (userData) => ({
//         url: '/api/user/register',
//         method: 'POST',
//         body: { ...userData },
//       }),
//       verifyEmail: builder.mutation({
//         query: (token) => ({
//           url: `/api/user/verify-email?token=${token}`,
//             method: 'PATCH',
//         }),

//     }),
//   }),
//   overrideExisting: false,
// })

// })

// export const { useLoginMutation, useRegisterMutation, useVerifyEmailMutation } = authApiSlice;