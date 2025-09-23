import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryRtk } from '../helper';
import { API_ROUTES } from '../../routes';

export const OrderApi = createApi({
  reducerPath: 'OrderApi',
  tagTypes: ['Order'],
  baseQuery: baseQueryRtk,
  endpoints: (build) => ({
    getOrdersByFilter: build.query({
      query: (filterKeyWord) => {
        return {
          url: `${API_ROUTES.getOrdersByFilter}?filter=${filterKeyWord}`,
          method: 'GET',
        };
      },
      providesTags: ['Order'],
    }),
    getOrdersByID: build.query({
      query: (payload) => {
        // console.log('payload ===============' ,payload)

        let queryParams = '';
        if (payload.filterKeyword === 'order') {
          queryParams = '?orderId';
        }
        if (payload.filterKeyword === 'user') {
          queryParams = '?userId';
        }

        // console.log('query params  ------------------', queryParams)

        return {
          url: `${API_ROUTES.getOrderByID}${queryParams}=${payload.id}`,
          method: 'GET',
        };
      },
      providesTags: ['Order'],
    }),
    editOrderByFilter: build.mutation({
      query: (payload) => {
        // console.log('order payload ====================]', payload);
        return {
          url: `${API_ROUTES.updateOrderStatus}/${payload.orderId}`,
          method: 'PATCH',
          body: { status: payload.status, reason: '' },
        };
      },
      invalidatesTags: ['Order'],
    }),
  }),
});
export const {
  useGetOrdersByFilterQuery,
  useGetOrdersByIDQuery,
  useEditOrderByFilterMutation,
} = OrderApi;
