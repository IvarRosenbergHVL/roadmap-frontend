import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/v1" }),
  tagTypes: ["App", "Feature", "Status", "Vote", "Comment", "UserRequest", "UserRequestComment"],
  endpoints: (builder) => ({
    // User Requests
    getUserRequests: builder.query({
      query: (appId) => `/user-requests?app_id=${appId}`,
      providesTags: ["UserRequest"],
    }),
    addUserRequest: builder.mutation({
      query: (body) => ({ url: "/user-requests", method: "POST", body }),
      invalidatesTags: ["UserRequest"],
    }),
      // Edit Comment
      updateComment: builder.mutation({
        query: ({ id, text }) => ({
          url: `/comments/${id}`,
          method: "PATCH",
          body: { text },
        }),
        invalidatesTags: ["Comment"],
      }),

      // Remove Vote
      deleteVote: builder.mutation({
        query: ({ feature_id, user_sub, fingerprint }) => ({
          url: `/votes`,
          method: "DELETE",
          body: { feature_id, user_sub, fingerprint },
        }),
        invalidatesTags: ["Vote", "Feature"],
      }),

      // Promote Feature
      promoteFeature: builder.mutation({
        query: ({ id, app_id, status_id }) => ({
          url: `/features/${id}/promote`,
          method: "POST",
          body: { app_id, status_id },
        }),
        invalidatesTags: ["Feature"],
      }),
    voteUserRequest: builder.mutation({
      query: (id) => ({ url: `/user-requests/${id}/vote`, method: "POST" }),
      invalidatesTags: ["UserRequest"],
    }),
    updateUserRequestStatus: builder.mutation({
      query: ({ id, status }) => ({ url: `/user-requests/${id}/status`, method: "PATCH", body: { status } }),
      invalidatesTags: ["UserRequest"],
    }),
    promoteUserRequest: builder.mutation({
      query: (id) => ({ url: `/user-requests/${id}/promote`, method: "PATCH" }),
      invalidatesTags: ["UserRequest", "Feature"],
    }),
    // User Request Comments
    getUserRequestComments: builder.query({
      query: (requestId) => `/user-requests/${requestId}/comments`,
      providesTags: ["UserRequestComment"],
    }),
    addUserRequestComment: builder.mutation({
      query: ({ request_id, author, text }) => ({
        url: `/user-requests/${request_id}/comments`,
        method: "POST",
        body: { author: author || "Anonym", text },
      }),
      invalidatesTags: ["UserRequestComment"],
    }),
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
    updateFeature: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/features/${id}`, method: "PATCH", body }),
      invalidatesTags: ["Feature"],
    }),
    updateFeatureStatus: builder.mutation({
      query: ({ id, status_id }) => ({
        url: `/features/${id}/status`,
        method: "PATCH",
        body: { status_id },
      }),
      invalidatesTags: ["Feature"],
    }),
    deleteFeature: builder.mutation({
      query: (id) => ({ url: `/features/${id}`, method: "DELETE" }),
      invalidatesTags: ["Feature"],
    }),
    getBackendVersion: builder.query({
      query: () => "/version",
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
  useDeleteFeatureMutation,
  useUpdateFeatureMutation,
  usePromoteFeatureRequestMutation,
  useUpdateCommentMutation,
  useDeleteVoteMutation,
  usePromoteFeatureMutation,
  useGetBackendVersionQuery,
  useGetUserRequestCommentsQuery,
  useAddUserRequestCommentMutation,
  useGetUserRequestsQuery,
  useVoteUserRequestMutation,
  useAddUserRequestMutation,
} = api;
