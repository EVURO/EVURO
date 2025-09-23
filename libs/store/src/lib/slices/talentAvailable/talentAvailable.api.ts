import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryRtk } from '../helper';
import { API_ROUTES } from '../../routes';

export const TalentAvailableApi = createApi({
  reducerPath: 'TalentAvailableApi',
  tagTypes: ['Available'],
  baseQuery: baseQueryRtk,
  endpoints: (build) => ({
    toggleUpdateAvailability: build.mutation({
      query: () => {
        const url = `${API_ROUTES.updateAvailability}`;
        console.log('toggleUpdateAvailability======', url);
        return {
          url: url,
          method: 'POST',
        };
      },
      invalidatesTags: ['Available'],
    }),
  }),
});

export const { useToggleUpdateAvailabilityMutation } = TalentAvailableApi;
