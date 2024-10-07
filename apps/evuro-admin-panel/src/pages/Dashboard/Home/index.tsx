import React from 'react';
import {
  CardsSection,
  RevenueSection,
  CustomerStatsSection,
} from './molecules';

import { useAdminDashboard } from '@evuro-frontend/hooks';

const Dashboard = () => {
  const {
    weeklyData,
    weeklyDataLoading,
    revenueData,
    revenueLoading,
    statsData,
    statsOverviewLoading,
    ordersPercentageData,
    ordersPercentageLoading,
  } = useAdminDashboard();
  return (
    <div className="flex flex-col gap-6 mb-8">
      {/* Cards Serction */}
      <section>
        <CardsSection
          weeklyData={weeklyData?.data}
          weeklyDataLoading={weeklyDataLoading}
        />
      </section>
      {/*  Revenue Section */}
      <section>
        <RevenueSection
          revenueData={revenueData?.data}
          revenueLoading={revenueLoading}
        />
      </section>
      {/* CustomerState Section */}
      <section>
        <CustomerStatsSection
          statsData={statsData}
          statsOverviewLoading={statsOverviewLoading}
          ordersPercentageData={ordersPercentageData}
          ordersPercentageLoading={ordersPercentageData}
        />
      </section>
    </div>
  );
};

export default Dashboard;
