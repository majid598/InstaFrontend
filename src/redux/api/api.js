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
        headers: {
          "token": localStorage.getItem("token")
        }
      }),
      invalidatesTags: ["User"],
    }),
    followToaUser: builder.mutation({
      query: (data) => ({
        url: `user/follow`,
        method: "PUT",
        credentials: "include",
        body: data,
        headers: {
          "token": localStorage.getItem("token")
        }
      }),
      invalidatesTags: ["User"],
    }),
    removeAFollower: builder.mutation({
      query: (data) => ({
        url: "user/follower/remove",
        method: "PUT",
        credentials: "include",
        body: data,
        headers: {
          "token": localStorage.getItem("token")
        }
      }),
      invalidatesTags: ["User"],
    }),
    newPost: builder.mutation({
      query: (post) => ({
        url: "post/new",
        method: "POST",
        credentials: "include",
        body: post,
        headers: {
          "token": localStorage.getItem("token")
        }
      }),
      invalidatesTags: ["Post"],
    }),
    allPosts: builder.query({
      query: () => ({
        url: "post/all",
        method: "GET",
        credentials: "include",
        headers: {
          "token": localStorage.getItem("token")
        }
      }),
      providesTags: ["Post"],
    }),
    getOtherUser: builder.query({
      query: (id) => ({
        url: `user/other/${id}`,
        method: "GET",
        credentials: "include",
        headers: {
          "token": localStorage.getItem("token")
        }
      }),
      providesTags: ["User", "Post"],
    }),
    uploadStory: builder.mutation({
      query: (story) => ({
        url: "user/story/upload",
        method: "POST",
        credentials: "include",
        body: story,
        headers: {
          "token": localStorage.getItem("token")
        }
      }),
      invalidatesTags: ["Story", "User"],
    }),
    getStories: builder.query({
      query: () => ({
        url: `user/story/all`, credentials: "include", headers: {
          "token": localStorage.getItem("token")
        }
      }),
      providesTags: ["Story", "User"],
    }),
    getStory: builder.query({
      query: (id) => ({
        url: `user/story/${id}`, credentials: "include", headers: {
          "token": localStorage.getItem("token")
        }
      }),
      providesTags: ["Story"],
    }),
    likePost: builder.mutation({
      query: (data) => ({
        url: `post/like`,
        method: "PUT",
        credentials: "include",
        body: data,
        headers: {
          "token": localStorage.getItem("token")
        }
      }),
      invalidatesTags: ["Post"],
    }),
    newReel: builder.mutation({
      query: (reel) => ({
        url: "post/reel/new",
        method: "POST",
        credentials: "include",
        body: reel,
        headers: {
          "token": localStorage.getItem("token")
        }
      }),
      invalidatesTags: ["Reel"],
    }),
    allReels: builder.query({
      query: () => ({
        url: "post/reel/all", credentials: "include", headers: {
          "token": localStorage.getItem("token")
        }
      }),
      providesTags: ["Reel"],
    }),
    likeReel: builder.mutation({
      query: (data) => ({
        url: `post/like/reel`,
        method: "PUT",
        credentials: "include",
        body: data,
        headers: {
          "token": localStorage.getItem("token")
        }
      }),
      invalidatesTags: ["Reel"],
    }),
    addToFavofites: builder.mutation({
      query: (data) => ({
        url: `post/reel/add/favorites`,
        method: "PUT",
        credentials: "include",
        body: data,
        headers: {
          "token": localStorage.getItem("token")
        }
      }),
      invalidatesTags: ["Reel"],
    }),
    logout: builder.query({
      query: () => ({
        url: "user/logout", credentials: "include", headers: {
          "token": localStorage.getItem("token")
        }
      }),
      providesTags: ["User"],
    }),
    newChat: builder.mutation({
      query: (chadIds) => ({
        url: "chat/new",
        method: "POST",
        credentials: "include",
        body: chadIds,
        headers: {
          "token": localStorage.getItem("token")
        }
      }),
      invalidatesTags: ["Chat"],
    }),
    getChat: builder.query({
      query: (id) => ({
        url: `chat/${id}`, credentials: "include", headers: {
          "token": localStorage.getItem("token")
        }
      }),
      providesTags: ["Chat", "User"],
    }),
    allMessages: builder.query({
      query: (id) => ({
        url: `chat/messages/${id}`, credentials: "include", headers: {
          "token": localStorage.getItem("token")
        }
      }),
      providesTags: ["Message"],
    }),
    myChats: builder.query({
      query: (id) => ({
        url: `chat/my/all?id=${id}`, credentials: "include", headers: {
          "token": localStorage.getItem("token")
        }
      }),
      providesTags: ["Message"],
    }),
    sendMessage: builder.mutation({
      query: (message) => ({
        url: "chat/send/message",
        method: "POST",
        credentials: "include",
        body: message,
        headers: {
          "token": localStorage.getItem("token")
        }
      }),
      invalidatesTags: ["Message"],
    }),
    myNotifications: builder.query({
      query: (id) => ({
        url: `user/notifications/my?id=${id}`,
        credentials: "include",
        headers: {
          "token": localStorage.getItem("token")
        }
      }),
      providesTags: ["Notification", "User"],
    }),
    addCommentToReel: builder.mutation({
      query: (comment) => ({
        url: "post/reel/comment",
        method: "POST",
        credentials: "include",
        body: comment,
        headers: {
          "token": localStorage.getItem("token")
        }
      }),
      invalidatesTags: ["Reel"],
    }),
    getReelById: builder.query({
      query: (id) => ({
        url: `post/reel/with/${id}`, credentials: "include", headers: {
          "token": localStorage.getItem("token")
        }
      }),
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
