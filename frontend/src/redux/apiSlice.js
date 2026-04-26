import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),

  tagTypes: ["Citizens", "Demandes", "Status"],

  endpoints: (builder) => ({
    // =========================
    // CITIZENS
    // =========================
    getCitizens: builder.query({
      query: () => "/citizens",
      providesTags: ["Citizens"],
    }),

    addCitizen: builder.mutation({
      query: (newCitizen) => ({
        url: "/citizens",
        method: "POST",
        body: newCitizen,
      }),
      invalidatesTags: ["Citizens"],
    }),

    updateCitizen: builder.mutation({
      query: ({ id, data }) => ({
        url: `/citizens/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Citizens"],
    }),

    deleteCitizen: builder.mutation({
      query: (id) => ({
        url: `/citizens/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Citizens"],
    }),
    getAdminProfile: builder.query({
      query: () => "/admin-profile",
      providesTags: ["AdminProfile"],
    }),

    updateAdminProfile: builder.mutation({
      query: (data) => ({
        url: "/admin-profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AdminProfile"],
    }),

    // =========================
    // DEMANDES
    // =========================
    getDemandes: builder.query({
      query: () => "/demandes",
      providesTags: ["Demandes"],
    }),

    addDemande: builder.mutation({
      query: (newDemande) => ({
        url: "/demandes",
        method: "POST",
        body: newDemande,
      }),
      invalidatesTags: ["Demandes"],
    }),

    updateDemande: builder.mutation({
      query: ({ id, data }) => ({
        url: `/demandes/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Demandes"],
    }),

    deleteDemande: builder.mutation({
      query: (id) => ({
        url: `/demandes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Demandes"],
    }),

    // =========================
    // STATUS
    // =========================
    getStatuses: builder.query({
      query: () => "/status",
      providesTags: ["Status"],
    }),

    addStatus: builder.mutation({
      query: (newStatus) => ({
        url: "/status",
        method: "POST",
        body: newStatus,
      }),
      invalidatesTags: ["Status"],
    }),

    updateStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/status/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Status"],
    }),

    deleteStatus: builder.mutation({
      query: (id) => ({
        url: `/status/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Status"],
    }),
  }),
});

export const {
  // Citizens
  useGetCitizensQuery,
  useAddCitizenMutation,
  useUpdateCitizenMutation,
  useDeleteCitizenMutation,

  // Demandes
  useGetDemandesQuery,
  useAddDemandeMutation,
  useUpdateDemandeMutation,
  useDeleteDemandeMutation,

  // Status
  useGetStatusesQuery,
  useAddStatusMutation,
  useUpdateStatusMutation,
  useDeleteStatusMutation,

  useGetAdminProfileQuery,
  useUpdateAdminProfileMutation,
} = apiSlice;
