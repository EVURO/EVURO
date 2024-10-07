import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryRtk } from '../helper';
import { API_ROUTES } from '../../routes';

export const OnBoardingApi = createApi({
  reducerPath: 'OnBoardingApi',
  tagTypes: ['OnBoarding'],
  baseQuery: baseQueryRtk,
  endpoints: (build) => ({
    getAllOnBoardings: build.query({
      query: () => {
        const url = API_ROUTES.allOnBoarding;
        return {
          url: url,
          method: 'GET',
        };
      },
      providesTags: ['OnBoarding'],
    }),
    createOnBoarding: build.mutation({
      query: (payload) => {
        return {
          url: API_ROUTES.createOnBoarding,
          method: 'POST',
          body: payload,
        };
      },
      invalidatesTags: ['OnBoarding'],
    }),
    updateOnBoarding: build.mutation({
      query: (payload) => {
        console.log('PAYLOAD IN QUERY========', payload);
        return {
          url: `${API_ROUTES.updateOnBoarding}/${payload.id}`,
          method: 'PUT',
          body: { status: payload.status },
        };
      },
      invalidatesTags: ['OnBoarding'],
    }),
    deleteOnBoarding: build.mutation({
      query: (id) => {
        return {
          url: `${API_ROUTES.deleteOnBoarding}/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['OnBoarding'],
    }),
  }),
});

export const {
  useGetAllOnBoardingsQuery,
  useCreateOnBoardingMutation,
  useUpdateOnBoardingMutation,
  useDeleteOnBoardingMutation,
} = OnBoardingApi;
