import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryRtk } from '../helper';
import { API_ROUTES } from '../../routes';

export const OrderProductApi = createApi({
  reducerPath: 'OrderProductApi',
  tagTypes: ['orderProduct'],
  baseQuery: baseQueryRtk,
  endpoints: (build) => ({
    placeOrder: build.mutation({
      query: (payload) => {
        return {
          url: API_ROUTES.placeOrder,
          method: 'POST',
          body: payload,
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
      invalidatesTags: ['orderProduct'],
    }),
    getMyOrders: build.mutation({
      query: (status) => {
        const url = `${API_ROUTES.getMyOrders}?status=${status}`;
        return {
          url: url,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { usePlaceOrderMutation, useGetMyOrdersMutation } =
  OrderProductApi;
