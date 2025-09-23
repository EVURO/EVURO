import React from 'react';

import { createColumnHelper } from '@tanstack/react-table';
import { useGetUserReportsQuery } from '../../../../../../../libs/store/src';

import { Table, Text, Image } from '../../../../components';

// const data = [
//   {
//     Email: 'ownerDog4@mail.com',
//     Name: ['profileImage_1698328987928.jpg', 'Owner Image'],
//     Order: 0,
//     Status: 'Dog Owner',
//     Complaint:
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, id accusamus.Nulla veniam est quae possimus harum. Sed, id accusamus.Nulla veniam est quae possimus harum ',
//   },
//   {
//     Email: 'ownerDog4@mail.com',
//     Name: ['profileImage_1698328987928.jpg', 'Owner Image'],
//     Order: 0,
//     Status: 'Dog Owner',
//     Complaint:
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, id accusamus.Nulla veniam est quae possimus harum. Sed, id accusamus.Nulla veniam est quae possimus harum ',
//   },
//   {
//     Email: 'ownerDog4@mail.com',
//     Name: ['profileImage_1698328987928.jpg', 'Owner Image'],
//     Order: 0,
//     Status: 'Dog Owner',
//     Complaint:
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, id accusamus.Nulla veniam est quae possimus harum. Sed, id accusamus.Nulla veniam est quae possimus harum ',
//   },
//   {
//     Email: 'ownerDog4@mail.com',
//     Name: ['profileImage_1698328987928.jpg', 'Owner Image'],
//     Order: 0,
//     Status: 'Dog Owner',
//     Complaint:
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, id accusamus.Nulla veniam est quae possimus harum. Sed, id accusamus.Nulla veniam est quae possimus harum ',
//   },
// ];

const DogOwner = () => {
  const columnHelper = createColumnHelper();

  const response = useGetUserReportsQuery();
  // const {
  //   comment,
  //   reason,
  //   reporter: { email, name, userType, profileImage },
  // } = response?.data?.data[0];

  // console.log(response?.data?.data);

  const data = response?.data?.data
    ?.filter((item) => item.reportedUser.name === 'Owner')
    .map((item) => ({
      Email: item.reportedUser.email,
      Name: [item.reportedUser.profileImage, item.reportedUser.name],
      Status: item.reportedUser.userType,
      Complaint: [item.reason, item.comment],
    }));

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
    columnHelper.accessor('Complaint', {
      cell: (info) => (
        <div className="space-y-1">
          <Text className="text-base">{info.getValue()[0]}</Text>
          <Text>{info.getValue()[1]}</Text>
        </div>
      ),
      header: () => <Text className="capitalize">Complaint</Text>,
    }),
    columnHelper.accessor('Status', {
      cell: (info) => <Text>{info.getValue()}</Text>,
      header: () => <Text className="capitalize">Status</Text>,
    }),
  ];

  return (
    <div className="max-w-[1640px] h-full flex flex-col">
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
    </div>
  );
};

export default DogOwner;
