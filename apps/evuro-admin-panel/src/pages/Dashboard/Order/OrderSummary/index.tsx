import React, { useEffect, useState } from 'react';

import { Button, Text } from '../../../../components';

import { BiLeftArrowAlt } from 'react-icons/bi';
import { createColumnHelper } from '@tanstack/react-table';
import DisplayTable from '../../../../components/helper/DisplayTable';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  useGetOrdersByIDQuery,
  useGetUsersQuery,
} from '../../../../../../../libs/store/src';

const API = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
const API_KEY = 'AIzaSyAJbd6lKbYD1CyFseAs9cXoFtAYbYNcKkM';

const OrderSummary = () => {
  const [location, setLocation] = useState('');

  const navigate = useNavigate();
  const columnHelper = createColumnHelper();
  const { orderId } = useParams();

  // fetching order details from api
  const orderResponse = useGetOrdersByIDQuery({
    id: orderId,
    filterKeyword: 'order',
  });

  const { userId } =
    orderResponse?.status === 'fulfilled' && orderResponse?.data?.data[0];

  // fetching user details from api
  const userResponse = useGetUsersQuery(userId);

  // console.log(
  //   '====================== user response ======================',
  //   userResponse
  // );

  const { productName, quantity, price } =
    orderResponse.status === 'fulfilled' &&
    orderResponse?.data?.data?.[0]?.orderDetails?.[0]?.productId;
  const { orderStatus } =
    orderResponse.status === 'fulfilled' && orderResponse?.data?.data[0];
  console.log(orderStatus);

  const { name, email, address, latitude, longitude } =
    userResponse.status === 'fulfilled' && userResponse?.data?.data;

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

  let totalPrice = 0;

  // getting location
  // useEffect(
  //   function () {
  //     getLocation(latitude, longitude, apiKey);
  //   },
  //   [latitude, longitude]
  // );

  const userData = [
    {
      id: userId,
      customerEmail: email,
      customerName: name,
      Location: location,
      address,
    },
  ];

  const productData = [
    {
      id: orderId,
      ProductName: productName,
      Quantity: quantity,
      Price: price,
      orderStatus,
    },
  ];

  // getting total price for reciept
  productData.map(
    (product) => (totalPrice += product.Quantity * product.Price)
  );

  const tableRows = productData
    .map(
      (product) => `
          <tr>
            <td style="padding: 0.5rem; border-bottom: 1px solid #9ca3af; width: 60%; text-align: left;">
              ${product.ProductName}
            </td>
            <td style="padding: 0.5rem; border-bottom: 1px solid #9ca3af; text-align: center;">$${
              product.Price
            }</td>
            <td style="padding: 0.5rem; border-bottom: 1px solid #9ca3af; text-align: center;">${
              product.Quantity
            }</td>
            <td style="padding: 0.5rem; border-bottom: 1px solid #9ca3af; text-align: center;">$${
              product.Price * product.Quantity
            }</td>
          </tr>
        `
    )
    .join('');

  // reciept
  const reciept = ` 
      <div class="receipt-container" style="padding: 20px 50px;">
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 4rem; font-weight: bold;">
          <div style="display: flex; justify-content: center; width: 100%; margin-bottom: 50px">
            <span style="text-transform: capitalize;">Order Receipt</span>
          </div>
        </div>
        <div>
            <div style="margin-bottom: 30px;">
                <div style="margin-bottom: 5px;">
                    <span style="font-weight: 600; font-size: 15px; margin-right: 86px;">Order ID: </span>
                    <span style="font-size: 13px;">${userData[0]?.id}</span>
                </div>
                <div style="margin-bottom: 5px;">
                    <span style="font-weight: 600; font-size: 15px; margin-right: 70px;">Order Time: </span>
                    <span style="font-size: 13px;">02/27/24 10:16 pm</span>
                </div>
                <div style="margin-bottom: 5px;">
                    <span style="font-weight: 600; font-size: 15px; margin-right: 43px;">Customer Name: </span>
                    <span style="font-size: 13px;">${
                      userData[0]?.customerName
                    }</span>
                </div>
                <div style="margin-bottom: 5px;">
                    <span style="font-weight: 600; font-size: 15px; margin-right: 42px;">Customer Email: </span>
                    <span style="font-size: 13px;">${
                      userData[0]?.customerEmail
                    }</span>
                </div>
                <div style="margin-bottom: 5px;">
                    <span style="font-weight: 600; font-size: 15px; margin-right: 72px;">Store Name: </span>
                    <span style="font-size: 13px;">Scooper Leash</span>
                </div>
                <div style="margin-bottom: 5px;">
                    <span style="font-weight: 600; font-size: 15px; margin-right: 58px;">Store Address: </span>
                    <span style="font-size: 13px;">${
                      userData[0]?.address
                    }</span>
                </div>            
            </div>
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background-color: #DDEAEF; height: 40px;">
                    <th style="padding: 0.5rem; font-size: 15px; border-bottom: 1px solid #9ca3af; width: 60%; text-align: left;">Product Name</th>
                    <th style="padding: 0.5rem; font-size: 15px; border-bottom: 1px solid #9ca3af;">Price</th>
                    <th style="padding: 0.5rem; font-size: 15px; border-bottom: 1px solid #9ca3af;">Quantity</th>
                    <th style="padding: 0.5rem; font-size: 15px; border-bottom: 1px solid #9ca3af;">Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #ccc; width: 20%; text-align: right;" colspan="3">Subtotal</td>
                        <td style="padding: 8px; border-bottom: 1px solid #ccc; text-align: center;">$${totalPrice}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #ccc; width: 20%; text-align: right;" colspan="3">Tax (10%)</td>
                        <td style="padding: 8px; border-bottom: 1px solid #ccc; text-align: center;">$${
                          totalPrice * 0.1
                        }</td>
                    </tr>
                    <tr style="background-color: #DDEAEF; font-weight: 500; font-size: 15px;">
                        <td style="padding: 8px; border-bottom: 1px solid #ccc; width: 20%; text-align: right;" colspan="3">Total</td>
                        <td style="padding: 8px; border-bottom: 1px solid #ccc; text-align: center;">$${
                          totalPrice + totalPrice * 0.1
                        }</td>
                    </tr>
                </tbody>
            </table>   
            <div style="margin: 20px 0;">
                <div style="font-weight: 600; font-size: 15px;">
                    <span>Order Status: </span>
                    <span>${productData[0]?.orderStatus}</span>
                </div>
            </div>
        </div>
    </div>
    `;

  // generating reciept
  function generateReceipt() {
    try {
      const receiptHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Receipt</title>
      </head>
      <body>
        ${reciept}
      </body>
      </html>
    `;

      const printWindow = window.open('', '_blank');
      printWindow?.document?.write(receiptHtml);

      printWindow?.print();

      // const blob = new Blob([receiptHtml], { type: 'text/html' });
      // const url = URL.createObjectURL(blob);

      // const a = document.createElement('a');
      // a.href = url;
      // a.download = 'receipt.html';
      // document.body.appendChild(a);
      // a.click();
      // document.body.removeChild(a);
      // URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating receipt:', error);
    }
  }

  // defining products columns
  const productColumn = [
    columnHelper.accessor('ProductName', {
      cell: (info) => {
        const value = info.getValue();
        return (
          <div className="flex flex-row items-center justify-start pl-[6px] py-[12px]">
            <Text className="capitalize font-normal text-[15px]">{value}</Text>
          </div>
        );
      },
      header: () => <Text className="capitalize">Product Name</Text>,
    }),
    columnHelper.accessor('Quantity', {
      cell: (info) => (
        <Text className="font-normal text-[15px] py-[12px]">
          {info.getValue()}
        </Text>
      ),
      header: () => <Text className="capitalize">Quantity</Text>,
    }),
    columnHelper.accessor('Price', {
      cell: (info) => (
        <Text className="font-normal text-[15px] py-[12px]">
          $ {info.getValue()}
        </Text>
      ),
      header: () => <Text className="capitalize">Price</Text>,
    }),

    columnHelper.accessor('Action', {
      header: () => <Text className="capitalize">Action</Text>,
      // cell: (info) => <Text>{info.getValue()}</Text>,
      cell: (info) =>
        info?.row?.id === '0' && (
          <Button
            onClick={() => alert('Order refunded 😊')}
            className="bg-gradient-to-r from-darkBlue to-darkBlue/60 text-euvroWhite border-none px-[25px] py-[10px] text-[15px] font-normal rounded-md"
          >
            Refund Order
          </Button>
        ),
    }),
  ];

  // defining user columns
  const userColumn = [
    columnHelper.accessor('customerEmail', {
      cell: (info) => {
        const value = info.getValue();
        return (
          <div className="font-normal py-[11px] pl-2 text-[15px] gap-3">
            <Text className="capitalize">{value}</Text>
          </div>
        );
      },
      header: () => <Text className="capitalize">Customer Email</Text>,
    }),
    columnHelper.accessor('customerName', {
      cell: (info) => (
        <Text className="font-normal text-[15px] py-[11px]">
          {info.getValue()}
        </Text>
      ),
      header: () => <Text className="capitalize">Customer Name</Text>,
    }),
    columnHelper.accessor('Location', {
      cell: (info) => (
        <Text className="font-normal text-[15px] py-[11px]">
          {info.getValue()}
        </Text>
      ),
      header: () => <Text className="capitalize">Location</Text>,
    }),

    columnHelper.accessor('customerAccount', {
      header: () => <Text className="capitalize">Customer Account</Text>,
      // cell: (info) => <Text>{info.getValue()}</Text>,
      cell: () => (
        <Link to={`/user/${userId}`}>
          <Text className="text-[#196F92] cursor-pointer py-[11px] font-normal text-[15px]">
            view Coustomer Account
          </Text>
        </Link>
      ),
    }),
  ];

  return (
    <div className="text-euvroBlack bg-euvroWhite text-base rounded-[10px] mb-5">
      <div className="bg-gradient-to-r from-darkBlue  to-darkBlue/60 rounded-tl-[10px] rounded-tr-[10px] text-euvroWhite px-[20px] py-3 space-y-2">
        <div className="flex items-center space-x-4">
          <BiLeftArrowAlt
            onClick={() => navigate(-1)}
            className="cursor-pointer text-[14px] font-normal"
            size={25}
          />
          <h3>Order Details</h3>
        </div>
        <div className="flex justify-between items-center text-[15px] font-normal">
          <span>Order # {orderId} (Transfer Number: 6645-65165)</span>
          <span>Sun, Feb 18, 2024 9:10 PM</span>
        </div>
      </div>

      <div>
        <h1 className="pb-4 pt-6 px-6 font-medium text-[15px]">Product</h1>
        <div className="relative">
          {orderResponse.status === 'fulfilled' && (
            <DisplayTable
              total={true}
              data={productData}
              columns={productColumn}
            />
          )}
        </div>
      </div>

      <div>
        {/* {userData && <DisplayTable data={userData} columns={userColumn} />} */}
        <DisplayTable total={false} data={userData} columns={userColumn} />
      </div>

      <div>
        <h1 className="bg-[#196F9226] py-[9px] px-6 text-[15px] font-medium">
          Other Information
        </h1>
        <div className="flex justify-between items-center text-[15px] px-6 pt-5 font-normal">
          <span>Store Name</span>
          <span>Scooper leash</span>
          <span></span>
        </div>
      </div>

      <div className="py-9 px-6 flex justify-between items-center">
        <span className="font-medium text-[15px]">
          Order Status: {productData[0]?.orderStatus}
        </span>
        <Button
          onClick={() => generateReceipt()}
          className="bg-gradient-to-r from-darkBlue to-darkBlue/60 text-euvroWhite text-[15px] font-normal px-[25px] py-[10px] border-none"
        >
          Download Receipt
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;
