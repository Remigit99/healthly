
import { apiSlice } from "../../api/apiSlice";

export const childrenApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChildren: builder.query({
      query: () => "/api/children",
      providesTags: ["Child"],
    }),
    addChild: builder.mutation({
      query: (childData) => ({
        url: "/api/children",
        method: "POST",
        body: childData,
      }),
      invalidatesTags: ["Child"], // Refetches the list automatically!
    }),
  }),
});

export const { useGetChildrenQuery, useAddChildMutation } = childrenApiSlice;