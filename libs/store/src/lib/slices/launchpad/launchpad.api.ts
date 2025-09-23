import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryRtk } from '../helper';
import { API_ROUTES } from '../../routes';

export const LaunchPadApi = createApi({
  reducerPath: 'LaunchPadApi',
  tagTypes: ['launchpad'],
  baseQuery: baseQueryRtk,
  endpoints: (build) => ({
    getLaunchPad: build.query({
      query: () => {
        const url = API_ROUTES.getLaunchpad;
        return {
          url: url,
          method: 'GET',
        };
      },
      providesTags: ['launchpad'],
    }),
    addLaunchPad: build.mutation({
      query: (payload) => {
        return {
          url: API_ROUTES.addLaunchPad,
          method: 'POST',
          body: payload,
        };
      },
      invalidatesTags: ['launchpad'],
    }),
    addLaunchpadComment: build.mutation({
      query: ({ payload }) => {
        return {
          url: API_ROUTES.addcomment,
          method: 'POST',
          body: payload,
        };
      },
      invalidatesTags: ['launchpad'],
    }),
    likeLaunchpad: build.mutation({
      query: () => {
        return {
          url: API_ROUTES.likeLaunchpad,
          method: 'POST',
        };
      },
      invalidatesTags: ['launchpad'],
    }),
    getLaunchPadByUnAuthUser: build.query({
      query: () => {
        const url = `${API_ROUTES.getLaunchPadByUnAuthUser}`;
        return {
          url: url,
          method: 'GET',
        };
      },
    }),
  }),
});
export const {
  useGetLaunchPadQuery,
  useAddLaunchPadMutation,
  useAddLaunchpadCommentMutation,
  useLikeLaunchpadMutation,
  useGetLaunchPadByUnAuthUserQuery,
} = LaunchPadApi;
