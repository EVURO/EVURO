import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryRtk } from '../helper';
import { API_ROUTES } from '../../routes';

export const UsersWithOrdersApi = createApi({
  reducerPath: 'UsersWithOrdersApi',
  tagTypes: ['UsersWithOrders'],
  baseQuery: baseQueryRtk,
  endpoints: (build) => ({
    getUsersWithOrders: build.query({
      query: (payload) => {
        return {
          url: `${API_ROUTES.getUsersWithOrders}=${payload}`,
          method: 'GET',
        };
      },
      providesTags: ['UsersWithOrders'],
    }),

    deleteUsersWithOrders: build.mutation({
      query: (id) => {
        return {
          url: `${API_ROUTES.deleteUserWithOrders}/${id}`,
          method: 'delete',
        };
      },
      invalidatesTags: ['UsersWithOrders'],
    }),
  }),
});
export const { useGetUsersWithOrdersQuery, useDeleteUsersWithOrdersMutation } =
  UsersWithOrdersApi;
