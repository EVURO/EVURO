import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryRtk } from '../helper';
import { API_ROUTES } from '../../routes';
import moment from 'moment';

export const ProductApi = createApi({
  reducerPath: 'ProductApi',
  tagTypes: ['Product'],
  baseQuery: baseQueryRtk,
  endpoints: (build) => ({
    getAdminProducts: build.query({
      query: () => {
        return {
          url: API_ROUTES.getAdminProducts,
          method: 'GET',
        };
      },
      providesTags: ['Product'],
    }),
    productRevenue: build.query({
      query: (payload) => {
        let queryParams = '';

        // console.log(
        //   'payload baefore calling api =========================',
        //   payload,
        //   'type of payload',
        //   typeof payload
        // );

        if (!payload) {
          queryParams += `startDate=${moment(new Date()).format(
            'YYYY-MM-DD'
          )}&endDate=${moment(new Date()).format('YYYY-MM-DD')}`;
        }

        if (payload?.fromDate) {
          queryParams += `startDate=${payload.fromDate}`;
        }
        if (payload?.toDate) {
          queryParams += `&endDate=${payload.toDate}`;
        }
        if (payload?.productId) {
          queryParams += `&productId=${payload.productId}`;
        }
        const url = `${API_ROUTES.productRevenue}${
          queryParams ? `?${queryParams}` : ''
        }`;
        // console.log('url in api =====', url);
        return {
          url,
          method: 'GET',
        };
      },
      providesTags: ['Product'],
    }),

    addAdminProduct: build.mutation({
      query: (payload) => {
        return {
          url: API_ROUTES.addAdminProduct,
          method: 'POST',
          body: payload,
        };
      },
      invalidatesTags: ['Product'],
    }),
    editAdminProduct: build.mutation({
      query: (payload) => {
        return {
          url: `${API_ROUTES.editAdminProduct}/${payload.id}`,
          method: 'PUT',
          body: payload.formData,
        };
      },
      invalidatesTags: ['Product'],
    }),
    deleteAdminProduct: build.mutation({
      query: (id) => {
        return {
          url: `${API_ROUTES.deleteAdminProduct}/${id}`,
          method: 'delete',
        };
      },
      invalidatesTags: ['Product'],
    }),
  }),
});
export const {
  useGetAdminProductsQuery,
  useProductRevenueQuery,
  useAddAdminProductMutation,
  useEditAdminProductMutation,
  useDeleteAdminProductMutation,
} = ProductApi;
