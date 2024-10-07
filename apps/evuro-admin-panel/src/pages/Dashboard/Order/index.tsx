import React, { useState, useMemo, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { LiaEditSolid } from 'react-icons/lia';
import { createColumnHelper } from '@tanstack/react-table';

import moment from 'moment';

import { Table, Text, Image } from '../../../components';
import { filterOrderResponseType } from './types';
import { useOrder } from '../../../../../../libs/hooks/src';
import {
  setScreenLoader,
  useAppDispatch,
  setAlert,
} from '../../../../../../libs/store/src';

const Order = () => {
  const [activeTab, setActiveTab] = useState<string>('Pending');
  const [editId, setEditId] = useState<string>('');
  const [openStatusOption, setOpenStatusOption] = useState(null);

  // Function to handle click on dropdown summary
  useEffect(
    function () {
      toggleStatusOption(null);
    },
    [activeTab]
  );

  const toggleStatusOption = (menu) => {
    if (openStatusOption === menu) {
      // Close if already open
      setOpenStatusOption(null);
    } else {
      // Open if closed
      setOpenStatusOption(menu);
    }
  };

  //useAppDispatch and useAppSelector
  const dispatch = useAppDispatch();

  // Custom Hook useProduct
  const {
    getFilterOrder,
    getFilterOrderLoading,
    handleEditOrderByFilter,
    editOrderFilterLoading,
  } = useOrder({
    editId,
    filterKeyWord: activeTab,
    resolveEdit: handleEditOrderStatusResolve,
  });

  // console.log('==========getFilterOrder========', getFilterOrder?.data);

  //screenLoader
  useEffect(() => {
    dispatch(setScreenLoader(getFilterOrderLoading));
  }, [getFilterOrderLoading]);

  function handleEditOrderStatusResolve(response: any) {
    if (response?.data?.status === 200) {
      dispatch(setScreenLoader(editOrderFilterLoading));
      dispatch(
        setAlert({
          visible: true,
          message: response?.data?.message,
          variant: 'success',
        })
      );
    } else {
      dispatch(
        setAlert({
          visible: true,
          message: response?.error?.data?.message || 'error updating data',
          variant: 'error',
        })
      );
    }
  }

  // status options for changing status
  const statusOptions = useMemo(() => {
    if (activeTab === 'In Progress') {
      return ['Complete'];
    } else if (activeTab === 'Complete') {
      return [];
    } else {
      return ['In Progress', 'Complete'];
    }
  }, [activeTab]);

  // data pass to ReactTable as Prop
  const data = useMemo(() => {
    return (
      getFilterOrder?.data?.map &&
      getFilterOrder?.data.map(
        ({
          orderDetails,
          user: { name: Customer },
          orderTime,
          orderPrice,
          orderStatus,
          _id,
        }: filterOrderResponseType) => ({
          OrderName: [
            orderDetails[0]?.productImage,
            orderDetails[0]?.productName,
          ],
          Customer,
          Timing: moment(orderTime).format('LT'),
          Amount: `$${Number.parseFloat(orderPrice).toFixed(2)}`,
          Status: [_id, orderStatus],
        })
      )
    );
  }, [getFilterOrder]);

  const columnHelper = createColumnHelper();
  // columns Pass to ReactTable as Prop
  const columns = [
    columnHelper.accessor('', {
      id: 'Sr.No',
      cell: (info) => <Text>{info.row.index + 1}</Text>,
      header: () => <Text className="capitalize">Sr No.</Text>,
    }),
    columnHelper.accessor('OrderName', {
      cell: (info) => (
        <div className="flex flex-row items-center justify-center gap-3">
          <div className="flex flex-row justify-start w-[100px] items-center gap-3">
            <Image className="rounded-full" url={info.getValue()[0]} />
            <Text className="capitalize">{info.getValue()[1]}</Text>
          </div>
        </div>
      ),
      header: () => <Text className="capitalize">Order Name</Text>,
    }),
    columnHelper.accessor('Customer', {
      cell: (info) => <Text>{info.getValue()}</Text>,
      header: () => <Text className="capitalize">Customer</Text>,
    }),
    columnHelper.accessor('Timing', {
      cell: (info) => <Text>{info.getValue()}</Text>,
      header: () => <Text className="capitalize">Timing</Text>,
    }),
    columnHelper.accessor('Amount', {
      cell: (info) => (
        <Text>{info.getValue() === '$NaN' ? 0 : info.getValue()}</Text>
      ),
      header: () => <Text className="capitalize">Amount</Text>,
    }),
    columnHelper.accessor('Status', {
      cell: (info) => (
        <div className="flex flex-row items-center justify-center">
          <details
            className="dropdown  dropdown-end  relative"
            open={
              activeTab === 'Complete' || info.getValue()[1] === 'Complete'
                ? false
                : openStatusOption === info.row.index
            } // Open status option based on row index
            onClick={() => toggleStatusOption(info.row.index)}
          >
            <summary
              className={`${
                activeTab === 'Complete' || info.getValue()[1] === 'Complete'
                  ? 'text-black/20'
                  : 'text-black/70'
              } m-1 btn btn-sm btn-link no-underline hover:no-underline cursor-pointer duration-300 capitalize`}
            >
              {/* {activeTab === 'Complete' || info.getValue()[1] === 'Complete' ? (
                <div></div>
              ) : (
                <LiaEditSolid size={22} className="text-black/70" />
              )} */}

              <LiaEditSolid size={22} />
            </summary>
            <ul className="p-2 shadow-drowDownShadow menu dropdown-content z-[1000] absolute top-8 xl:left-0 py-2 rounded-box w-40 bg-euvroWhite overflow-x-hidden gap-1">
              {statusOptions
                .filter((option) =>
                  info.getValue()[1] === 'In Progress'
                    ? info.getValue()[1] !== option
                    : option
                )
                .map((menu, index) => (
                  <li
                    key={index}
                    className="font-normal duration-300 text-sm hover:text-md hover:cursor-pointer hover:bg-darkBlue/20 rounded-md py-1 px-2"
                    onClick={() => {
                      handleEditOrderByFilter(
                        menu === 'In Progress'
                          ? {
                              orderId: info.getValue()[0],
                              status: 'accept',
                            }
                          : {
                              orderId: info.getValue()[0],
                              status: menu,
                            }
                      );
                    }}
                  >
                    {menu}
                  </li>
                ))}
            </ul>
          </details>
        </div>
      ),

      header: () => <Text className="capitalize">Status</Text>,
    }),
    columnHelper.accessor('Status', {
      cell: (info) => (
        <div className="flex flex-row items-center justify-center">
          <summary className="m-1 list-none cursor-pointer relative duration-300 capitalize ">
            <Link to={`/order/${info.getValue()[0]}`}>
              <Text
                className={`font-medium text-[12px] ${
                  info.getValue()[1] === 'Complete'
                    ? 'text-completeStatus'
                    : info.getValue()[1] === 'Pending'
                    ? 'text-pendingStatus'
                    : info.getValue()[1] === 'In Progress'
                    ? 'text-inProgressStatus'
                    : 'text-black/70'
                }`}
                onClick={() => console.log(info.getValue())}
              >
                {info.getValue()[1]}
              </Text>
            </Link>
          </summary>
        </div>
      ),

      header: () => <Text className="capitalize">Status</Text>,
    }),
  ];

  // console.log('==========data Map========', data);

  // console.log('====formik values=====', values);
  // console.log('===formik errors=====', errors);
  // console.log('======formik touched=======', touched);

  const orderStatusTabs = ['All', 'Pending', 'In Progress', 'Complete'];
  // On going
  // Complete
  // Pending
  // Inprogress

  return (
    <div className="max-w-[1640px] h-full flex flex-col gap-5 ">
      {/* Button Div */}
      <div className="flex flex-row justify-between mx-5">
        {/* Input Div */}
        <div className="tabs tabs-bordered">
          {orderStatusTabs.map((status, index) => (
            <Text
              key={index}
              className={`tab ${
                status === activeTab
                  ? 'tab-active border-b-2 text-darkBlue border-darkBlue/100'
                  : 'text-darkGray'
              }`}
              onClick={() => setActiveTab(status)}
            >
              {status === 'On going' ? 'All' : status}
            </Text>
          ))}
        </div>
        {/* Filter Button */}
        {/* <Button
          type="button"
          className="h-[50px] btn rounded-[5px] text-[15px] text-buttonWhite  font-normal leading-[22.5px] px-8 text-center
        bg-gradient-to-r from-darkBlue  to-darkBlue/60"
          onClick={toggleModal}
        >
          {' '}
          <img
            src={Svgs.filterSlider}
            alt={'filter'}
            className="h-6 w-6"
          />{' '}
          <Text className="text-[15px]">Filter</Text>
        </Button> */}
      </div>
      {/* Table Div */}
      <div>
        {data?.length > 0 ? (
          <div className=" bg-white rounded-xl mx-5 mb-5">
            <Table data={data} columns={columns} />
          </div>
        ) : data?.length === 0 || data?.length === undefined ? (
          <Text className="text-center font-bold text-error">
            No Data found.
          </Text>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Order;
