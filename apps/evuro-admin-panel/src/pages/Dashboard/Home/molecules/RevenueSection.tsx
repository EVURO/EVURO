import React from 'react';
import { Button, Text } from '../../../../components';
import Chart from 'react-apexcharts';
import { BiCaretDown } from 'react-icons/bi';

const RevenueSection = ({ revenueData, revenueLoading }) => {
  // console.log('revenueData=======', revenueData);
  // console.log('revenueLoading======', revenueLoading);
  let series;
  if (
    typeof revenueData?.monthlyRevenue === 'object' &&
    Object.keys(revenueData?.monthlyRevenue).length > 0
  ) {
    series = Object?.values(revenueData?.monthlyRevenue).map((revenue) =>
      Number(revenue)
    );
  }
  // console.log('seriesData=======', series);
  const state = {
    options: {
      colors: ['#FFC029'],
      chart: {
        id: 'basic-bar',
        toolbar: {
          show: false,
        },
      },
      states: {
        hover: {
          filter: {
            type: 'none',
          },
        },
        active: {
          filter: {
            type: 'none',
          },
        },
      },
      plotOptions: {
        bar: {
          // borderRadiusApplication: 'end',
          columnWidth: '40%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      // Xaxis border lines are hidden
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'July',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        labels: {
          style: {
            fontSize: '15px',
            fontWeight: 600,
            fontFamily: 'poppins',
            colors: '#A7A7A7',
          },
        },

        show: false,

        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
    },
    series: [
      {
        name: 'Revenue',
        data: series || [],
        show: false,
      },
    ],
  };

  return (
    <div className=" w-full bg-white rounded-[20px] shadow dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-start gap-4 pl-[3.5%]">
          <Text className="leading-none text-2xl font-medium text-otpGrayText">
            Total Revenue
          </Text>
          <Text className="leading-none text-4xl font-medium text-gray-900 pb-1">
            {revenueData?.totalYearlyRevenue === undefined
              ? '$0.00'
              : `$${revenueData?.totalYearlyRevenue.toFixed(2)}`}
          </Text>
        </div>

        <Button className="flex justify-center items-center bg-euvroWhite border-[#196f92] text-[#196f92] shadow-lg hover:bg-[#11B0F0] hover:text-euvroWhite duration-300">
          <span>This Year</span>
          <BiCaretDown />
        </Button>
      </div>
      <Chart
        options={state.options}
        series={state.series}
        type="bar"
        width="100%"
        height="400"
        className="w-full"
      />
    </div>
  );
};
export default RevenueSection;
