import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryRtk } from '../helper';
import { API_ROUTES } from '../../routes';

export const BillingAddressesApi = createApi({
  reducerPath: 'BillingAddressesApi',
  tagTypes: ['Address'],
  baseQuery: baseQueryRtk,
  endpoints: (build) => ({
    addBillingAddress: build.mutation({
      query: (payload) => {
        return {
          url: `${API_ROUTES.addBillingAddress}`,
          method: 'POST',
          body: payload,
        };
      },
      invalidatesTags: ['Address'],
    }),
    getUserAddresses: build.query({
      query: (id) => {
        const url = id
          ? `${API_ROUTES.getUserAddresses}?addressId=${id}`
          : API_ROUTES.getUserAddresses;
        return {
          url: url,
          method: 'GET',
        };
      },
      providesTags: ['Address'],
    }),

    deleteUserAddress: build.mutation({
      query: (id) => {
        return {
          url: `${API_ROUTES.deleteUserAddress}/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Address'],
    }),
    editUserAddress: build.mutation({
      query: ({ id, payload }) => {
        const url = `${API_ROUTES.editUserAddress}/${id}`;
        // console.log('url====', url);
        return {
          url: url,
          method: 'PUT',
          body: payload,
        };
      },
      invalidatesTags: ['Address'],
    }),
  }),
});

export const {
  useGetUserAddressesQuery,
  useAddBillingAddressMutation,
  useDeleteUserAddressMutation,
  useEditUserAddressMutation,
} = BillingAddressesApi;
