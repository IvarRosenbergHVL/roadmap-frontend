
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/v1" }),
  tagTypes: ["App", "Feature", "Status", "Vote", "Comment"],
  endpoints: (builder) => ({
    getApps: builder.query({ query: () => "/apps", providesTags: ["App"] }),
    getFeatures: builder.query({
      query: (appId) => `/features?app_id=${appId}`,
      providesTags: ["Feature"],
    }),
    addFeature: builder.mutation({
      query: (body) => ({ url: "/features", method: "POST", body }),
      invalidatesTags: ["Feature"],
    }),
    addComment: builder.mutation({
      query: (body) => ({ url: "/comments", method: "POST", body }),
      invalidatesTags: ["Comment"],
    }),
    // osv…
  }),
});

export const {
  useGetAppsQuery,
  useGetFeaturesQuery,
  useAddFeatureMutation,
  useAddCommentMutation,
} = api;
