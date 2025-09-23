import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryRtk } from '../helper';
import { API_ROUTES } from '../../routes';

export const AdminDashboardApi = createApi({
  reducerPath: 'AdminDashboardApi',
  tagTypes: ['adminDashboard'],
  baseQuery: baseQueryRtk,
  endpoints: (build) => ({
    getWeeklyData: build.query({
      query: () => {
        return {
          url: API_ROUTES.getWeeklyData,
          method: 'GET',
        };
      },
      providesTags: ['adminDashboard'],
    }),
    getRevenueData: build.query({
      query: () => {
        return {
          url: API_ROUTES.revenue,
          method: 'GET',
        };
      },
      providesTags: ['adminDashboard'],
    }),
    getStatsOverviewsData: build.query({
      query: () => {
        return {
          url: API_ROUTES.getStatsOverview,
          method: 'GET',
        };
      },
      providesTags: ['adminDashboard'],
    }),
    getUsersOrderPercentage: build.query({
      query: () => {
        return {
          url: API_ROUTES.getUsersOrderPercentage,
          method: 'GET',
        };
      },
      providesTags: ['adminDashboard'],
    }),
  }),
});

export const {
  useGetWeeklyDataQuery,
  useGetRevenueDataQuery,
  useGetStatsOverviewsDataQuery,
  useGetUsersOrderPercentageQuery,
} = AdminDashboardApi;
