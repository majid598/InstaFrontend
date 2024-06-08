import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const server = import.meta.env.VITE_SERVER;

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/` }),
  tagTypes: ["User", "Post", "Story", "Reel", "Chat", "Message"],
  endpoints: (builder) => ({
    editProfile: builder.mutation({
      query: (data) => ({
        url: "user/profile/edit",
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    followToaUser: builder.mutation({
      query: (data) => ({
        url: `user/follow`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    removeAFollower: builder.mutation({
      query: (data) => ({
        url: "user/follower/remove",
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    newPost: builder.mutation({
      query: (post) => ({
        url: "post/new",
        method: "POST",
        credentials: "include",
        body: post,
      }),
      invalidatesTags: ["Post"],
    }),
    allPosts: builder.query({
      query: () => ({
        url: "post/all",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Post"],
    }),
    getOtherUser: builder.query({
      query: (id) => ({
        url: `user/other/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User", "Post"],
    }),
    uploadStory: builder.mutation({
      query: (story) => ({
        url: "user/story/upload",
        method: "POST",
        credentials: "include",
        body: story,
      }),
      invalidatesTags: ["Story", "User"],
    }),
    getStories: builder.query({
      query: () => ({ url: `user/story/all`, credentials: "include" }),
      providesTags: ["Story", "User"],
    }),
    getStory: builder.query({
      query: (id) => ({ url: `user/story/${id}`, credentials: "include" }),
      providesTags: ["Story"],
    }),
    likePost: builder.mutation({
      query: (data) => ({
        url: `post/like`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),
    newReel: builder.mutation({
      query: (reel) => ({
        url: "post/reel/new",
        method: "POST",
        credentials: "include",
        body: reel,
      }),
      invalidatesTags: ["Reel"],
    }),
    allReels: builder.query({
      query: () => ({ url: "post/reel/all", credentials: "include" }),
      providesTags: ["Reel"],
    }),
    likeReel: builder.mutation({
      query: (data) => ({
        url: `post/like/reel`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Reel"],
    }),
    addToFavofites: builder.mutation({
      query: (data) => ({
        url: `post/reel/add/favorites`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Reel"],
    }),
    logout: builder.query({
      query: () => ({ url: "user/logout", credentials: "include" }),
      providesTags: ["User"],
    }),
    newChat: builder.mutation({
      query: (chadIds) => ({
        url: "chat/new",
        method: "POST",
        credentials: "include",
        body: chadIds,
      }),
      invalidatesTags: ["Chat"],
    }),
    getChat: builder.query({
      query: (id) => ({ url: `chat/${id}`, credentials: "include" }),
      providesTags: ["Chat", "User"],
    }),
    allMessages: builder.query({
      query: (id) => ({ url: `chat/messages/${id}`, credentials: "include" }),
      providesTags: ["Message"],
    }),
    myChats: builder.query({
      query: (id) => ({ url: `chat/my/all?id=${id}`, credentials: "include" }),
      providesTags: ["Message"],
    }),
    sendMessage: builder.mutation({
      query: (message) => ({
        url: "chat/send/message",
        method: "POST",
        credentials: "include",
        body: message,
      }),
      invalidatesTags: ["Message"],
    }),
    myNotifications: builder.query({
      query: (id) => ({
        url: `user/notifications/my?id=${id}`,
        credentials: "include",
      }),
      providesTags: ["Notification", "User"],
    }),
    addCommentToReel: builder.mutation({
      query: (comment) => ({
        url: "post/reel/comment",
        method: "POST",
        credentials: "include",
        body: comment,
      }),
      invalidatesTags: ["Reel"],
    }),
    getReelById: builder.query({
      query: (id) => ({ url: `post/reel/with/${id}`, credentials: "include" }),
      providesTags: ["Reel"],
    }),
  }),
});

export const {
  useEditProfileMutation,
  useNewPostMutation,
  useAllPostsQuery,
  useGetOtherUserQuery,
  useRemoveAFollowerMutation,
  useFollowToaUserMutation,
  useUploadStoryMutation,
  useGetStoriesQuery,
  useGetStoryQuery,
  useLikePostMutation,
  useNewReelMutation,
  useAllReelsQuery,
  useLogoutQuery,
  useGetChatQuery,
  useAllMessagesQuery,
  useMyChatsQuery,
  useLikeReelMutation,
  useSendMessageMutation,
  useNewChatMutation,
  useMyNotificationsQuery,
  useAddCommentToReelMutation,
  useGetReelByIdQuery,
  useAddToFavofitesMutation,
} = api;
export default api;
