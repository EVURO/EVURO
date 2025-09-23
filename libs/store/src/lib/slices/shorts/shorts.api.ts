import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryRtk } from '../helper';
import { API_ROUTES } from '../../routes';

export const ShortsApi = createApi({
  reducerPath: 'ShortsApi',
  tagTypes: ['shorts'],
  baseQuery: baseQueryRtk,
  endpoints: (build) => ({
    getShorts: build.query({
      query: ({ userId }) => {
        const url = userId
          ? `${API_ROUTES.getShorts}?userId=${userId}`
          : API_ROUTES.getShorts;

        return {
          url: url,
          method: 'GET',
        };
      },
      providesTags: ['shorts'],
    }),
    createShort: build.mutation({
      query: (payload) => {
        return {
          url: API_ROUTES.createShort,
          method: 'POST',
          body: payload,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
      },
      invalidatesTags: ['shorts'],
    }),
    likeShort: build.mutation({
      query: (id) => {
        return {
          url: `${API_ROUTES.likeShort}/${id}`,
          method: 'POST',
        };
      },
      invalidatesTags: ['shorts'],
    }),
    dislikeShort: build.mutation({
      query: (id) => {
        return {
          url: `${API_ROUTES.dislikeShort}/${id}`,
          method: 'POST',
        };
      },
      invalidatesTags: ['shorts'],
    }),
  }),
});

export const {
  useGetShortsQuery,
  useLikeShortMutation,
  useDislikeShortMutation,
  useCreateShortMutation,
} = ShortsApi;
