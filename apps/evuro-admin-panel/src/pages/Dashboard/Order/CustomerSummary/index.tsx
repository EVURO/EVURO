import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  useGetOrdersByIDQuery,
  useGetUsersQuery,
} from '../../../../../../../libs/store/src';
import { createColumnHelper } from '@tanstack/react-table';

import { Button, Image, Table, Text } from '../../../../components';
import moment from 'moment';

const API = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
const API_KEY = 'AIzaSyAJbd6lKbYD1CyFseAs9cXoFtAYbYNcKkM';

const CustomerSummary = () => {
  const [activeTab, setActiveTab] = useState<string>('All Orders');
  const [location, setLocation] = useState('');
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const { userId } = useParams();

  const columnHelper = createColumnHelper();

  // fetching user details from api
  const userResponse = useGetUsersQuery(userId);

  const userDetailsResponse = useGetOrdersByIDQuery({
    id: userId,
    filterKeyword: 'user',
  });

  // extracting data for table in state
  useEffect(() => {
    const extractedData = [];
    // let totalPrice = 0;

    userDetailsResponse?.data?.data.forEach((data: any) => {
      const { orderStatus: Status } = data;
      data.orderDetails.forEach((detail: any) => {
        const {
          productName: ProductName,
          price: Price,
          quantity,
          updatedAt: Date,
        } = detail.productId;
        extractedData.push({ ProductName, Price, quantity, Date, Status });
        // totalPrice += parseFloat(Price) * quantity;
      });
    });

    setData(extractedData);

    // console.log('toyal price ===========================', totalPrice);
  }, [userDetailsResponse]);

  // console.log('user details response ===========================', userDetailsResponse);
  // console.log('order details ===============================', data);

  // if user details not found return to previous page
  useEffect(
    function () {
      if (userResponse.status === 'rejected') navigate(-1);
    },
    [userResponse]
  );

  // user details
  const {
    name: userName,
    email: userEmail,
    address: userAddress,
    profileImage: userProfileImage,
    latitude,
    longitude,
  } = userResponse.status === 'fulfilled' && userResponse?.data?.data;

  // getting location
  useEffect(
    function () {
      // function for getting location
      async function getLocation(latitude, longitude) {
        try {
          const response = await fetch(
            `${API}${latitude},${longitude}&key=${API_KEY}`
          );
          const data = await response.json();

          // console.log(data?.results?.at(-1)?.formatted_address);

          setLocation(data?.results?.at(-1)?.formatted_address);
        } catch (error) {
          console.log('Error fetching location ', error);
        }
      }

      // console.log('latitude', latitude, 'longitude', longitude)

      if (latitude && longitude) {
        getLocation(latitude, longitude);
      }
    },
    [latitude, longitude]
  );

  // cards
  const cards = [
    {
      name: 'Total Cash',
      cost: 'New cost last 365 days',
      price:
        data
          .reduce(
            (total, item) =>
              total + parseFloat(item?.Price.replace('$', '')) * item?.quantity,
            0
          )
          .toFixed(0) + ' $',
    },
    {
      name: 'Total Order',
      cost: 'Total order last 365 days',
      price: data.length,
    },
    {
      name: 'Complete',
      cost: 'Total order last 365 days',
      price: data.filter((item) => item.Status === 'Complete').length,
    },
    {
      name: 'Pending',
      cost: 'Total order last 365 days',
      price: data.filter((item) => item.Status === 'Pending').length,
    },
  ];

  // tabs
  const tabs = [
    {
      name: 'All Orders',
    },
    {
      name: 'Complete',
    },
    {
      name: 'In Progress',
    },
    {
      name: 'Pending',
    },
  ];

  // filtering data
  const displayData =
    activeTab === 'All Orders'
      ? data.filter((row) => row)
      : data.filter((row) => row.Status === activeTab);

  // columns Pass to ReactTable as Prop
  const columns = [
    columnHelper.accessor('', {
      id: 'id',
      cell: (info) => (
        <Text className="text-[14px] font-normal">{info.row.index + 1}</Text>
      ),
      header: () => (
        <Text className="capitalize text-[14px] font-medium">ID</Text>
      ),
    }),
    columnHelper.accessor('ProductName', {
      cell: (info) => (
        <div className="flex flex-row items-center justify-center gap-3">
          <Text className="capitalize text-[14px] font-normal">
            {info.getValue()}
          </Text>
        </div>
      ),
      header: () => (
        <Text className="capitalize text-[14px] font-medium">Product Name</Text>
      ),
    }),
    columnHelper.accessor('Date', {
      cell: (info) => (
        <Text className="text-[14px] font-normal">
          {moment(info.getValue()).format('DD MMM, YYYY')}
        </Text>
      ),
      header: () => (
        <Text className="capitalize text-[14px] font-medium">Date</Text>
      ),
    }),
    columnHelper.accessor('Status', {
      cell: (info) => (
        <div className="flex flex-row items-center justify-center">
          <summary className="m-1 list-none relative duration-300 capitalize">
            <Text
              className={`font-medium text-[14px] ${
                info.getValue() === 'Complete'
                  ? 'text-completedStatus'
                  : info.getValue() === 'In Progress'
                  ? 'text-processingStatus'
                  : info.getValue() === 'Pending'
                  ? 'text-cancelledStatus'
                  : 'text-black/70'
              }`}
              // onClick={() => console.log(info.getValue())}
            >
              {info.getValue()}
            </Text>
          </summary>
        </div>
      ),

      header: () => (
        <Text className="capitalize text-[14px] font-medium">Status</Text>
      ),
    }),
    columnHelper.accessor('Price', {
      cell: (info) => (
        <Text className="text-[15px] font-normal">
          $ {info.getValue() * info?.row?.original?.quantity}
        </Text>
      ),
      header: () => (
        <Text className="capitalize text-[14px] font-medium">Price</Text>
      ),
    }),
  ];

  const totalCash =
    'h-[140px] rounded-[10px] w-[230px] p-5 text-euvroWhite bg-gradient-to-r from-summaryCashGradient to-summaryCashGradient2';
  const totalOrder =
    'h-[140px] rounded-[10px] w-[230px] p-5 text-euvroWhite bg-gradient-to-r from-summaryOrderGradient to-summaryOrderGradient2';
  const complete =
    'h-[140px] rounded-[10px] w-[230px] p-5 text-euvroWhite bg-gradient-to-r from-summaryCompletedGradient to-summaryCompletedGradient2';
  const pending =
    'h-[140px] rounded-[10px] w-[230px] p-5 text-euvroWhite bg-gradient-to-r from-summarycancelledGradient to-summarycancelledGradient2';

  return (
    <div className="space-y-9 px-2">
      {/* cards */}
      <div className="flex md:justify-between md:items-center gap-[23px] md:flex-nowrap flex-wrap justify-center">
        {cards.map((tab, index) => (
          <div
            key={tab.name}
            onClick={() =>
              tab.name === 'Total Cash' || tab.name === 'Total Order'
                ? setActiveTab('All Orders')
                : setActiveTab(tab.name)
            }
            className={`
                ${
                  index === 0
                    ? totalCash
                    : index === 1
                    ? totalOrder
                    : index === 2
                    ? complete
                    : pending
                } space-y-5 cursor-pointer flex-grow
              `}
          >
            <Text className="font-medium text-[15px]">{tab.name}</Text>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Text className="font-medium text-3xl">{tab.price}</Text>
                {tab.name === 'Pending' ||
                tab.name === 'Complete' ||
                tab.name === 'Total Order' ? (
                  <div
                    className={`rounded-full h-4 w-4 ${
                      tab.name === 'Total Order'
                        ? 'bg-[#FFD600]'
                        : tab.name === 'Complete'
                        ? 'bg-[#00CD11]'
                        : 'bg-[#FF0000]'
                    }`}
                  ></div>
                ) : (
                  <></>
                )}
              </div>
              <Text className="font-normal text-[15px]">{tab.cost}</Text>
            </div>
          </div>
        ))}
      </div>

      <div className="flex pb-10 text-euvroBlack space-y-10 lg:space-y-0 lg:space-x-16 flex-col items-center lg:flex-row lg:items-start">
        {/* user details card */}
        <div className="lg:w-[20%] w-full">
          <h4 className="font-medium text-[15px] mb-4">Customer Information</h4>
          <div className="border-[0.5px] border-[#959595] rounded-[10px] bg-euvroWhite h-[270px] lg:w-[223px] w-full space-y-4 px-4 py-5">
            <div className="flex justify-between items-center">
              <div className="flex flex-col ">
                <span className="font-normal text-[13px]">Name </span>
                <span className="font-medium text-[14px]">{userName}</span>
              </div>
              <Image
                url={
                  userProfileImage instanceof File
                    ? URL.createObjectURL(userProfileImage)
                    : userProfileImage
                }
                className="rounded-full h-10 w-10"
              />
            </div>
            <div className="flex flex-col ">
              <span className="font-normal text-[13px]">Email </span>
              <span className="font-medium text-[14px]">{userEmail}</span>
            </div>
            <div className="flex flex-col ">
              <span className="font-normal text-[13px]">Location </span>
              <span className="font-medium text-[14px]">{location}</span>
            </div>
            <div className="flex flex-col ">
              <span className="font-normal text-[13px]">Billing Address </span>
              <span className="font-medium text-[14px]">{userAddress}</span>
            </div>
          </div>
        </div>

        {/* table */}
        <div className="lg:w-[78%] w-full ">
          <h1 className="font-medium text-[15px]">Order</h1>
          <div className="space-x-8">
            {tabs.map((tab) => (
              <Button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`my-[10px] px-[25px] text-[12px] font-normal ${
                  tab.name === activeTab
                    ? 'bg-gradient-to-r from-darkBlue to-darkBlue/60 text-euvroWhite'
                    : 'bg-euvroWhite bg-opacity-0 text-[#959595] border-[#959595] hover:text-euvroWhite hover:bg-[#11B0F0]'
                }`}
              >
                {tab.name}
              </Button>
            ))}
          </div>
          <div className="bg-white rounded-xl my-[20px]">
            <Table data={displayData} columns={columns} />
          </div>
          <Button
            onClick={() => navigate(-1)}
            className="bg-gradient-to-r from-darkBlue to-darkBlue/60 text-euvroWhite px-12 py-3 float-right"
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomerSummary;
