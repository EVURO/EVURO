import React from 'react';
import { Text } from '../../../../components';

const CustomerStatsSection = ({
  statsData,
  statsOverviewLoading,
  ordersPercentageData,
  ordersPercentageLoading,
}) => {
  console.log('statsData==========', statsData?.data);
  // console.log('statsOverviewLoading==========', statsOverviewLoading);
  // console.log('ordersPercentageData==========', ordersPercentageData);
  // console.log('ordersPercentageLoading==========', ordersPercentageLoading);

  let orderPercentage;
  let statsPercentage;
  if (statsData?.data && Object.entries(statsData?.data).length > 0) {
    statsPercentage = Object.entries(statsData?.data).map(
      ([user, percentage]) => ({ user, percentage })
    );
  }

  if (
    ordersPercentageData?.data &&
    Object.entries(ordersPercentageData?.data).length > 0
  ) {
    orderPercentage = Object.entries(ordersPercentageData?.data).map(
      ([user, percentage]) => ({ user, percentage })
    );
  }

  const currentText =
    'font-bold text-2xl text-purpleProgressColor bg-white rounded-full h-[100px] w-[100px] flex flex-row items-center justify-center indicator';
  const activeText =
    'font-bold text-2xl text-yellowProgressColor bg-white rounded-full h-[100px] w-[100px] flex flex-row items-center justify-center indicator';
  const loyalText =
    'font-bold text-2xl text-orangeProgressColor bg-white rounded-full h-[100px] w-[100px] flex flex-row items-center justify-center indicator';
  const impulseText =
    'font-bold text-2xl text-redProgressColor bg-white rounded-full h-[100px] w-[100px] flex flex-row items-center justify-center indicator';

  const dogParentState = 'progress progress-warning w-full h-4 text-euvroWhite';
  const dogTalentState = 'progress progress-error w-full  h-4 text-euvroWhite';
  const scooperLeashState =
    'progress progress-primary w-full  h-4 text-euvroWhite';

  const gradient = (user, percentage) => {
    switch (true) {
      case user === 'dogParentOrderPercentage':
        return `conic-gradient(from 180deg, #5F27CD ${
          percentage * 3.6
        }deg, #F2F2F2 0deg)`;
      case user === 'talentOrderPercentage':
        return `conic-gradient(from 180deg,  #FFC029 ${
          percentage * 3.6
        }deg,#F2F2F2 0deg)`;
      case user === 'scooperLeashOrderPercentage':
        return `conic-gradient(from 180deg,  #FF8918 ${
          percentage * 3.6
        }deg, #F2F2F2 0deg)`;
      default:
        return `conic-gradient(from 180deg,   #FF6B6B ${
          percentage * 3.6
        }deg, #F2F2F2 0deg)`;
    }
  };

  return (
    <div className="h-auto xl:h-[60vh] flex flex-col items-center justify-center gap-6 xl:flex-row  md:gap-10 rounded-2xl">
      <section className="h-full bg-euvroWhite w-full xl:w-1/2 rounded-2xl self-end shadow-md py-5 flex flex-col gap-5">
        <div className="flex flex-col justify-between gap-2 px-8">
          <Text className="font-bold text-euvroBlack text-2xl">Order's Percentage</Text>
          <Text className="font-semibold text-sm text-otpGrayText">
            {ordersPercentageData?.message}
          </Text>
        </div>

        <div className="grid grid-cols-2 place-content-center gap-5">
          {orderPercentage?.map((order, index) => (
            <div
              key={index}
              className=" flex flex-col justify-between space-y-3 items-center"
            >
              <div
                className="relative h-[122px] w-[122px]  rounded-full
               
                flex flex-col items-center justify-center"
                style={{
                  background: gradient(order.user, order.percentage),
                }}
              >
                <div
                  className={
                    order.user === 'dogParentOrderPercentage'
                      ? currentText
                      : order.user === 'talentOrderPercentage'
                      ? activeText
                      : order.user === 'scooperLeashOrderPercentage'
                      ? loyalText
                      : impulseText
                  }
                >
                  <Text>
                    {order.percentage % 1 !== 0
                      ? order.percentage.toFixed(1)
                      : order.percentage}
                  </Text>
                  <Text className="indicator-center text-black text-base relative top-[-3px]">
                    {' '}
                    %
                  </Text>
                </div>
              </div>
              <Text className="text-sm font-semibold  text-otpGrayText text-center">
                {order.user.includes('dogParentOrderPercentage')
                  ? 'Dog Parent'
                  : order.user.includes('talentOrderPercentage')
                  ? 'Dog Talent'
                  : 'Scooper Leash'}
              </Text>
            </div>
          ))}
        </div>
      </section>
      <section className=" h-[85%]  bg-euvroWhite w-full xl:w-1/2 rounded-2xl  self-end shadow-md py-5">
        <div className="flex flex-col justify-end gap-8  px-8 h-full">
          <div className="flex flex-col space-y-2 h-[20%]">
            <Text className="font-bold text-euvroBlack text-2xl">Stats Overview</Text>
            <Text className="font-semibold text-sm text-otpGrayText">
              {statsData?.message}
            </Text>
          </div>

          <div className="flex flex-col justify-around gap-6 h-[80%]">
            {statsPercentage?.map((overview, index) => (
              <div key={index} className=" flex flex-col items-start  ">
                <Text className="text-sm font-semibold  text-otpGrayText text-center">
                  {overview.user.includes('dogParentPercentage')
                    ? 'Dog Parent'
                    : overview.user.includes('talentPercentage')
                    ? 'Dog Talent'
                    : 'Scooper Leash'}
                </Text>
                <progress
                  className={
                    overview.user === 'dogParentOrderPercentage'
                      ? dogParentState
                      : overview.user === 'talentPercentage'
                      ? dogTalentState
                      : scooperLeashState
                  }
                  value={overview.percentage}
                  max="100"
                ></progress>
                <Text className="w-full font-semibold text-sm flex flex-row justify-end">
                  {overview.percentage.toFixed(1)}%
                </Text>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomerStatsSection;
