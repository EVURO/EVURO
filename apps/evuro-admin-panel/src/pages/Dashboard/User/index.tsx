import { createColumnHelper } from '@tanstack/react-table';
import { Table, Text, Image, ConfirmationModal } from '../../../components';
import React, { useState, useMemo, useEffect } from 'react';
import { MdDelete } from 'react-icons/md';
import { useUsersWithOrders } from '@evuro-frontend/hooks';
import {
  useAppDispatch,
  setScreenLoader,
  setAlert,
} from '@evuro-frontend/store';
import { deleteModalHelper } from '@evuro-frontend/db';

const User = () => {
  const [activeTab, setActiveTab] = useState('');
  const [loaderId, setLoaderId] = useState('');

  //useAppDispatch and useAppSelector
  const dispatch = useAppDispatch();

  //delete Modal helper
  const { deleteToggleModal, deleteModal } = deleteModalHelper();

  // Custom Hook useProduct
  const {
    getUsersWithOrders,
    getUsersWithOrdersLoading,
    getUsersWithOrdersRefetch,
    handleDeleteUserWithOrders,
    deleteUserWithOrdersLoading,
  } = useUsersWithOrders({
    deleteResolve: deleteUserWithOrder,
    filterKeyWord: activeTab,
  });

  console.log('==========getUsersWithOrders========', getUsersWithOrders?.data);

  //delete Video function
  function deleteUserWithOrder(response: any) {
    // console.log('=====delete video function the response is=====', response);
    if (response?.data?.status === 200) {
      dispatch(
        setAlert({
          visible: true,
          message: response?.data?.message,
          variant: 'error',
        })
      );
      getUsersWithOrdersRefetch();
      deleteToggleModal();
    } else {
      dispatch(
        setAlert({
          visible: true,
          text: response?.error?.data?.message,
          variant: 'error',
        })
      );
    }
  }

  // data pass to ReactTable as Prop
  const data = useMemo(() => {
    return (
      getUsersWithOrders?.data?.map &&
      getUsersWithOrders?.data.map(
        ({ profileImage, name, email, orderCount, userType, _id }) => ({
          Name: [profileImage, name],
          Email: email,
          Order: Number.parseInt(orderCount),
          Status: userType,
          Delete: _id,
        })
      )
    );
  }, [getUsersWithOrders]);

  const columnHelper = createColumnHelper();
  // columns Pass to ReactTable as Prop
  const columns = [
    columnHelper.accessor('', {
      id: 'Sr.No',
      cell: (info) => <Text>{info.row.index + 1}</Text>,
      header: () => <Text className="capitalize">Sr No.</Text>,
    }),
    columnHelper.accessor('Name', {
      cell: (info) => (
        <div className="flex flex-row items-center justify-center gap-3">
          <Image url={info.getValue()[0]} className="w-full rounded-full" />
          <Text className="capitalize w-1/4">{info.getValue()[1]}</Text>
        </div>
      ),
      header: () => <Text className="capitalize">Name</Text>,
    }),
    columnHelper.accessor('Email', {
      cell: (info) => <Text>{info.getValue()}</Text>,
      header: () => <Text className="capitalize">Email</Text>,
    }),
    columnHelper.accessor('Order', {
      cell: (info) => <Text>{info.getValue()}</Text>,
      header: () => <Text className="capitalize">Order</Text>,
    }),
    columnHelper.accessor('Status', {
      cell: (info) => <Text>{info.getValue()}</Text>,
      header: () => <Text className="capitalize">Status</Text>,
    }),
    columnHelper.accessor('Delete', {
      cell: (info) => (
        <MdDelete
          size={22}
          className="text-error cursor-pointer duration-300 w-full"
          onClick={() => {
            setLoaderId(info.getValue());
            deleteToggleModal();
          }}
        />
      ),
      header: () => <Text className="capitalize">Delete</Text>,
    }),
  ];

  const userStatusTabs = ['All User', 'Dog Parent', 'Talent'];
  // All User
  // Dog Parent
  // Talent

  useEffect(() => {
    dispatch(setScreenLoader(getUsersWithOrdersLoading));
    setActiveTab('All User');
  }, [getUsersWithOrdersLoading]);

  return (
    <div className="max-w-[1640px]  h-full flex flex-col gap-5 ">
      {/* Button Div */}
      <div className="flex flex-row justify-between mx-5">
        {/* Input Div */}
        <div className="tabs tabs-bordered">
          {userStatusTabs.map((status, index) => (
            <Text
              key={index}
              className={`tab ${
                status === activeTab
                  ? 'tab-active border-b-2 text-darkBlue border-darkBlue/100'
                  : 'text-darkGray'
              }`}
              onClick={() => setActiveTab(status)}
            >
              {status}
            </Text>
          ))}
        </div>
      </div>
      {/* Table Div */}
      <div>
        {data?.length > 0 ? (
          <div className=" bg-white rounded-xl mx-5 mb-5">
            <Table data={data} columns={columns} />
          </div>
        ) : data?.length === 0 ? (
          <Text className="text-center font-bold text-error">
            No Data found.
          </Text>
        ) : (
          <div></div>
        )}
      </div>
      {deleteModal && (
        <ConfirmationModal
          deleteModal={deleteModal}
          deleteToggleModal={deleteToggleModal}
          deleteLoading={deleteUserWithOrdersLoading}
          deleteFunction={handleDeleteUserWithOrders}
          deleteId={loaderId}
        />
      )}
    </div>
  );
};

export default User;
