import React from 'react';
import { Svgs } from '@evuro-frontend/assets';
import { Text } from '../../../../components';

const CardsSection = ({ weeklyData, weeklyDataLoading }) => {
  // console.log('weekly Data=======', weeklyData);
  // console.log('weeklyDataLoading======', weeklyDataLoading);
  let cards;
  if (typeof weeklyData === 'object' && Object.keys(weeklyData).length > 0) {
    cards = Object.entries(weeklyData).map(([title, value], index) => ({
      title,
      value,
      svg:
        index === 0
          ? Svgs.adminDashboardEarning
          : index === 1
          ? Svgs.adminDashboardOrder
          : Svgs.adminDashboardUser,
    }));
  }

  const earningCard =
    'h-40 rounded-xl bg-gradient-to-r from-dashboardEarningCardGradient to-dashboardEarningCardGradient2 text-center text-euvroWhite flex flex-col justify-center gap-6 px-[5%]';
  const orderCard =
    'h-40 rounded-xl  bg-gradient-to-r from-dashboardOrderCardGradient  to-dashboardOrderCardGradient2 text-center text-euvroWhite flex flex-col justify-center gap-6 px-[5%]';
  const userCard =
    'h-40 rounded-xl bg-gradient-to-r from-dashboardUserCardGradient to-dashboardUserCardGradient2 text-center text-euvroWhite flex flex-col justify-center gap-6 px-[5%]';

  return (
    <div className="grid md:grid-cols-3 gap-4 md:gap-6 xl:gap-10">
      {cards?.map((card, index) => (
        <div
          className={
            index === 0 ? earningCard : index === 1 ? orderCard : userCard
          }
          key={index}
        >
          <div className="flex flex-row">
            <Text className="w-9/12 font-medium text-[15px] flex">
              {card.title === 'weeklyEarnings'
                ? 'Weekly Earnings'
                : card.title === 'weeklyOrders'
                ? 'Weekly Orders'
                : 'Total Users'}
            </Text>
            <div className="w-3/12  flex justify-end">
              <img src={Svgs.adminDashboardOptionMenu} alt="Options" />
            </div>
          </div>
          <div className="flex flex-row">
            <Text className="w-9/12 font-medium text-[25px] flex">
              {card.value > 0 && card.value < 10
                ? `0${card.value}`
                : card.title === 'weeklyEarnings'
                ? `$ ${card.value}`
                : card.value}
            </Text>
            <div className="w-3/12 flex justify-end items-center relative">
              <img
                src={card.svg}
                className={`w-[25px] h-[25px]`}
                alt="Options"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardsSection;
