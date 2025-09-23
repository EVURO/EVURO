import React, { useState, useEffect, useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import moment from 'moment';

import {
  setAlert,
  setScreenLoader,
  useAppDispatch,
} from '../../../../../../../libs/store/src';
import { useProduct } from '../../../../../../../libs/hooks/src';

import {
  Table,
  Button,
  Text,
  Input,
  Image,
  CustomDatePicker,
} from '../../../../components';

const Revenue = () => {
  const today = moment().format('YYYY-MM-DD');
  const formattedDate = moment(today, 'YYYY-MM-DD').format('YYYY-MM-DD');
  const [isRefetching, setIsRefetching] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [revenues, setRevenues] = useState({
    fromDate: '',
    toDate: '',
    productId: '',
  });

  const columnHelper = createColumnHelper();

  const dispatch = useAppDispatch();

  // Custom Hook useProduct
  const {
    getProductsByDateData,
    getProductsByDateLoading,
    getProductsByDateRefetch,
  } = useProduct(
    isRefetching && {
      payload: revenues,
    }
  );

  // data pass to ReactTable as Prop
  const data = useMemo(() => {
    return (
      getProductsByDateData?.data?.map &&
      getProductsByDateData?.data.map(
        ({
          productImage,
          productName,
          availability,
          orderCount,
          price,
          _id,
        }) => ({
          Image: productImage,
          Name: productName,
          Availability: availability,
          Price: `$${Number.parseFloat(price).toFixed(2)}`,
          Order: orderCount,
          Edit: _id,
          Delete: _id,
        })
      )
    );
  }, [getProductsByDateData]);

  //screenLoader
  useEffect(() => {
    // console.log('in loading useEffect===========');
    dispatch(setScreenLoader(getProductsByDateLoading));
  }, [getProductsByDateLoading]);

  useEffect(
    function () {
      if (isRefetching) {
        if (getProductsByDateData?.status === 200) {
          dispatch(setScreenLoader(getProductsByDateLoading));
          dispatch(
            setAlert({
              visible: true,
              message: getProductsByDateData?.message,
              variant: 'success',
            })
          );
        } else {
          dispatch(
            setAlert({
              visible: true,
              message: 'error fetching data',
              variant: 'error',
            })
          );
        }
      }
    },
    [isRefetching]
  );

  // setDate format
  useEffect(() => {
    if (!revenues.fromDate && !revenues.toDate) {
      setRevenues({ ...revenues, fromDate: today, toDate: today });

      const fromDateInput = document.getElementsByName('fromDate')[0];
      const toDateInput = document.getElementsByName('toDate')[0];
      fromDateInput.setAttribute('data-date', formattedDate);
      toDateInput.setAttribute('data-date', formattedDate);
    }
  }, []);

  const handleChange = (e) => {
    setIsRefetching(false);

    if (e.target.name === 'productId') {
      setRevenues({ ...revenues, [e.target.name]: e.target.value });
    } else {
      setRevenues({
        ...revenues,
        [e.target.name]: e.target.value,
      });
      const formattedDate = moment(e.target.value).format('YYYY-MM-DD');
      e.target.setAttribute('data-date', formattedDate);
    }
  };

  const handelFromDate = (e) => {
    setIsRefetching(false);
    setRevenues({ ...revenues, fromDate: moment(e).format('YYYY-MM-DD') });
  };

  const handelToDate = (e) => {
    setIsRefetching(false);
    setRevenues({ ...revenues, toDate: moment(e).format('YYYY-MM-DD') });
  };

  const resetValue = () => {
    setIsReset(true);
    setIsRefetching(false);
    console.log('resetRevenue=========');
    setRevenues({
      ...revenues,
      fromDate: today,
      toDate: today,
      productId: '',
    });
  };

  const totalPrice = useMemo(() => {
    return getProductsByDateData?.data.reduce((accumlator, currentItem) => {
      return accumlator + currentItem?.orderCount * currentItem?.quantity;
    }, 0);
  }, [getProductsByDateData]);

  // columns Pass to ReactTable as Prop
  const columns = [
    columnHelper.accessor('', {
      id: 'Sr.No',
      cell: (info) => <Text>{info.row.index + 1}</Text>,
      header: () => <Text className="capitalize">Sr No.</Text>,
    }),
    columnHelper.accessor('Image', {
      cell: (info) => <Image className="rounded-full" url={info.getValue()} />,
      header: () => <Text className="capitalize">Image</Text>,
    }),
    columnHelper.accessor('Name', {
      cell: (info) => <Text>{info.getValue()}</Text>,
      header: () => <Text className="capitalize">Name</Text>,
    }),
    columnHelper.accessor('Availability', {
      cell: (info) => <Text>{info.getValue() === true ? 'yes' : 'no'}</Text>,
      header: () => <Text className="capitalize">Availability</Text>,
    }),
    columnHelper.accessor('Price', {
      cell: (info) => <Text>{info.getValue()}</Text>,
      header: () => <Text className="capitalize">Price</Text>,
    }),
    columnHelper.accessor('Order', {
      cell: (info) => <Text>{info.getValue()}</Text>,
      header: () => <Text className="capitalize">Order</Text>,
    }),
    columnHelper.accessor('Total Price', {
      cell: (info) => {
        const price = (info.row.original as { Price: string }).Price ?? 0;
        const order = (info.row.original as { Order: number }).Order ?? 0;

        const totalPrice = Number(price.replace('$', '')) * Number(order);
        // console.log('totalAmount prop========', sumOfPrice);
        return (
          <Text className="capitalize">{`$${totalPrice.toFixed(2)}`}</Text>
        );
      },
      header: () => <Text>Total Price</Text>,
    }),
  ];

  // console.log('====revenues values=====', revenues);
  console.log('data ====================================', data);

  const handelSearch = () => {
    setIsRefetching(true);
    getProductsByDateRefetch({ payload: revenues });
  };

  return (
    <div className="max-w-[1640px] flex flex-col gap-9 pt-8 bg-euvroWhite mb-5 rounded-xl">
      {/* Button Div */}

      <Text className="font-medium text-2xl px-4">Revenues</Text>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-y-9 gap-x-36 px-4 overflow-y-none">
        {/* From Date */}
        <div className=" col-start-1 col-span-2 md:col-span-2 lg:col-span-1 flex flex-row justify-between items-center h-[55px]">
          <Text className="text-black font-medium text-[15px] w-2/12">
            From Date
          </Text>
          <div className="w-[80%] relative">
            <Input
              name="fromDate"
              value={revenues.fromDate}
              onChange={(e) => handleChange(e)}
              type="date"
              date-date=""
              className="border-[1px_solid_lightGray] rounded-[5px] bg-euvroWhite text-euvroBlack border-euvroBlack w-full focus:outline-none"
              placeholder={moment(revenues.fromDate).format('YYYY-MM-DD')}
            />
            <CustomDatePicker
              reset={isReset}
              setReset={setIsReset}
              id={revenues.fromDate}
              handleChange={handelFromDate}
            />
          </div>
        </div>
        {/* To Date */}
        <div className=" col-start-1 col-span-2 md:col-span-2 lg:col-span-1 flex flex-row items-center ">
          <Text className="text-black font-medium text-[15px] w-2/12 ">
            To Date
          </Text>
          <div className="w-10/12 relative">
            <Input
              name="toDate"
              value={revenues.toDate}
              onChange={(e) => handleChange(e)}
              type="date"
              data-date=""
              className="border-[1px_solid_lightGray] rounded-[5px] bg-euvroWhite text-euvroBlack border-euvroBlack w-full"
              placeholder={moment(revenues.toDate).format('YYYY-MM-DD')}
            />
            {/* <DateInput /> */}
            <CustomDatePicker
              reset={isReset}
              setReset={setIsReset}
              id={revenues.toDate}
              handleChange={handelToDate}
            />
          </div>
        </div>

        {/* Select Product*/}
        <div className="col-start-1 col-span-2 md:col-span-2 lg:col-span-1">
          <select
            name="productId"
            className="select select-bordered w-full rounded-[5px] bg-euvroWhite border-euvroBlack text-euvroBlack"
            onChange={(e) => handleChange(e)}
            value={revenues.productId}
          >
            <option
              value="Select"
              className="hover:bg-pink-200 focus:bg-pink-200"
            >
              Select Product
            </option>
            {getProductsByDateData?.data?.map((product, index) => (
              <option
                key={index}
                value={product._id}
                className="hover:bg-pink-200 focus:bg-pink-200"
              >
                {product.productName}
              </option>
            ))}
          </select>
        </div>

        {/*Buttons Stack*/}
        <div className="col-start-1 col-span-2 md:col-span-2 lg:col-span-1 flex flex-row self-end justify-center gap-6 px-2">
          <Button
            type="button"
            className="btn rounded-[5px] text-[15px] text-buttonWhite  font-normal leading-[22.5px] px-8 text-center w-1/2 h-full
        bg-darkBlue hover: bg-gradient-to-r from-darkBlue  to-darkBlue/60"
            onClick={resetValue}
          >
            {' '}
            Reset
          </Button>

          <Button
            type="button"
            className=" btn rounded-[5px] text-[15px] text-buttonWhite  font-normal leading-[22.5px] px-8 text-center w-1/2 h-full
        bg-darkBlue hover: bg-gradient-to-r from-darkBlue  to-darkBlue/60"
            onClick={handelSearch}
            isLoading={getProductsByDateLoading}
          >
            {' '}
            Search
          </Button>
        </div>
      </section>
      {/* Table Div */}
      <div>
        {data?.length > 0 ? (
          <div className=" bg-white rounded-xlmx-5">
            <Table
              data={
                totalPrice === 0 ? data : data.filter((row) => row.Order > 0)
              }
              columns={columns}
              totalAmount={totalPrice}
            />
          </div>
        ) : data?.length === undefined ? (
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

export default Revenue;
