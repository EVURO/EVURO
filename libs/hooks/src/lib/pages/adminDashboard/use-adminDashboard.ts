import {
  useGetWeeklyDataQuery,
  useGetRevenueDataQuery,
  useGetStatsOverviewsDataQuery,
  useGetUsersOrderPercentageQuery,
} from '@evuro-frontend/store';

export const useAdminDashboard = () => {
  try {
    const { data: weeklyData, isLoading: weeklyDataLoading } =
      useGetWeeklyDataQuery('');
    const { data: revenueData, isLoading: revenueLoading } =
      useGetRevenueDataQuery('');
    const { data: statsData, isLoading: statsOverviewLoading } =
      useGetStatsOverviewsDataQuery('');
    const { data: ordersPercentageData, isLoading: ordersPercentageLoading } =
      useGetUsersOrderPercentageQuery('');

    return {
      weeklyData,
      weeklyDataLoading,
      revenueData,
      revenueLoading,
      statsData,
      statsOverviewLoading,
      ordersPercentageData,
      ordersPercentageLoading,
    };
  } catch (error) {
    console.log('promises are rejected');
    throw Error('Promise failed');
  }
};
