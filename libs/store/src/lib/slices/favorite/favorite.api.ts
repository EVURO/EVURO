import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryRtk } from '../helper';
import { API_ROUTES } from '../../routes';

export const FavoriteApi = createApi({
  reducerPath: 'FavoriteApi',
  tagTypes: ['favorite'],
  baseQuery: baseQueryRtk,
  endpoints: (build) => ({
    getFavoriteTalents: build.query({
      query: () => {
        const url = `${API_ROUTES.getFavoriteTalents}`;
        return {
          url: url,
          method: 'GET',
        };
      },
      providesTags: ['favorite'],
    }),
    toggleFavoriteTalent: build.mutation({
      query: (id) => {
        const url = `${API_ROUTES.toggleFavoriteTalent}/${id}`;
        console.log('toggleFavoriteTalent_url======', url);
        return {
          url: url,
          method: 'POST',
        };
      },
      invalidatesTags: ['favorite'],
    }),
  }),
});

export const { useGetFavoriteTalentsQuery, useToggleFavoriteTalentMutation } =
  FavoriteApi;
