import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryRtk } from '../helper';
import { API_ROUTES } from '../../routes';

export const PostsApi = createApi({
  reducerPath: 'PostsApi',
  tagTypes: ['posts'],
  baseQuery: baseQueryRtk,
  endpoints: (build) => ({
    createPost: build.mutation({
      query: (payload) => {
        return {
          url: API_ROUTES.createPost,
          method: 'POST',
          body: payload,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
      },
      invalidatesTags: ['posts'],
    }),
    getPosts: build.query({
      query: ({ id }) => {
        const url = id
          ? `${API_ROUTES.getPosts}?userId=${id}`
          : API_ROUTES.getPosts;
        return {
          url: url,
          method: 'GET',
        };
      },
      providesTags: ['posts'],
    }),
    likePost: build.mutation({
      query: ({ id }) => {
        return {
          url: `${API_ROUTES.likePost}/${id}`,
          method: 'POST',
        };
      },
      invalidatesTags: ['posts'],
    }),
    addPostComment: build.mutation({
      query: ({ payload, id }) => {
        return {
          url: `${API_ROUTES.addPostComment}/${id}`,
          method: 'POST',
          body: payload,
        };
      },
      invalidatesTags: ['posts'],
    }),
    likePostComment: build.mutation({
      query: ({ postId, commentId }) => {
        const url = `${API_ROUTES.likePostComment.posts}/${postId}/${API_ROUTES.likePostComment.likeComment}/${commentId}`;
        return {
          url: url,
          method: 'POST',
        };
      },
      invalidatesTags: ['posts'],
    }),
  }),
});

export const {
  useLikePostMutation,
  useCreatePostMutation,
  useGetPostsQuery,
  useAddPostCommentMutation,
  useLikePostCommentMutation,
} = PostsApi;
