

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/v1" }),
  tagTypes: ["App", "Feature", "Status", "Vote", "Comment"],
  endpoints: (builder) => ({
    getApps: builder.query({ query: () => "/apps", providesTags: ["App"] }),
    addApp: builder.mutation({
      query: (body) => ({ url: "/apps", method: "POST", body }),
      invalidatesTags: ["App"],
    }),
    getFeatures: builder.query({
      query: (appId) => `/features?app_id=${appId}`,
      providesTags: ["Feature"],
    }),
    getStatuses: builder.query({
      query: (appId) => `/statuses?app_id=${appId}`,
      providesTags: ["Status"],
    }),
    addFeature: builder.mutation({
      query: (body) => ({ url: "/features", method: "POST", body }),
      invalidatesTags: ["Feature"],
    }),
    addStatus: builder.mutation({
      query: (body) => ({ url: "/statuses", method: "POST", body }),
      invalidatesTags: ["Status"],
    }),
    updateStatus: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/statuses/${id}`, method: "PATCH", body }),
      invalidatesTags: ["Status"],
    }),
    deleteStatus: builder.mutation({
      query: (id) => ({ url: `/statuses/${id}`, method: "DELETE" }),
      invalidatesTags: ["Status"],
    }),
    addComment: builder.mutation({
      query: (body) => ({ url: "/comments", method: "POST", body }),
      invalidatesTags: ["Comment"],
    }),
    updateFeatureStatus: builder.mutation({
      query: ({ id, status_id }) => ({
        url: `/features/${id}/status`,
        method: "PATCH",
        body: { status_id },
      }),
      invalidatesTags: ["Feature"],
    }),
  }),
});

export const {
  useGetAppsQuery,
  useAddAppMutation,
  useGetFeaturesQuery,
  useGetStatusesQuery,
  useAddFeatureMutation,
  useAddCommentMutation,
  useUpdateFeatureStatusMutation,
  useAddStatusMutation,
  useUpdateStatusMutation,
  useDeleteStatusMutation,
  usePromoteFeatureRequestMutation,
} = api;
