
import { apiSlice } from "../../api/apiSlice";

export const servicesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChildren: builder.query({
      query: () => "/api/children",
      providesTags: ["Child"],
    }),
    bookAppointment: builder.mutation({
      query: (data) => ({
        url: "/api/appointments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Appointment"],
    }),

    getMyAppointments: builder.query({
      query: () => "/api/appointments/my-appointments",
      providesTags: ["Appointment"],
    }),

    getParentDashboard: builder.query({
      query: () => "/api/parent/parent-dashboard",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetChildrenQuery, useBookAppointmentMutation, useGetParentDashboardQuery } =
  servicesApiSlice;
