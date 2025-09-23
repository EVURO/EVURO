import React from 'react';

import {
  flexRender,
  // getFilteredRowModel,
  // getPaginationRowModel,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Text from '../../base/Text';

interface TablePropsTypes {
  data: Record<string, any>[];
  columns: any[];
  // globalSearch?: string;
  totalAmount?: number;
  total: boolean;
}

const DisplayTable = ({
  data,
  columns,
  total,
}: // globalSearch,
TablePropsTypes) => {
  // console.log('data in table ==============', data);
  // console.log('totalAmount prop========', totalAmount);
  const table = useReactTable({
    data,
    columns,
    // state: { globalFilter: globalSearch },
    getCoreRowModel: getCoreRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
  });

  const originalPrice = data.reduce(
    (total, row) => total + (row.Quantity || 0) * (row.Price || 0),
    0
  );

  const subTotal = originalPrice + originalPrice * 0.1;

  return (
    <div className="overflow-x-hidden pb-6 max-h-[300px] overflow-y-auto">
      <table className="table border-hidden">
        {/* head */}
        <thead className="h-auto bg-[#196F9226] text-euvroBlack sticky top-0 z-10">
          {table.getHeaderGroups()?.map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className={`text-center text-sm font-semibold border-b-0 w-full flex justify-between`}
            >
              {headerGroup.headers?.map((header) => (
                <th
                  key={header.id}
                  className={`font-medium px-6 flex text-[15px] ${
                    header.id === 'ProductName'
                      ? 'justify-start w-[450px]'
                      : 'w-[215px]'
                  } ${
                    header.id === 'Price' ||
                    header.id === 'Quantity' ||
                    header.id === 'Action'
                      ? 'justify-center'
                      : ''
                  } `}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table?.getRowModel()?.rows?.map((row, index) => (
            <tr key={row.id} className="border-b-0 flex justify-between">
              {row?.getVisibleCells()?.map((cell) => (
                <td
                  key={cell.id}
                  className={`${
                    cell.id === '0_ProductName'
                      ? 'w-[450px] justify-start'
                      : ' w-[215px]'
                  } ${
                    cell.id === '0_Quantity' ||
                    cell.id === '0_Price' ||
                    cell.id === '0_Action'
                      ? 'justify-center'
                      : ''
                  } capitalize text-center flex items-center `}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
          {/* Conditional rendering of total row */}
          {total && (
            <div className="px-[6px]">
              {/* original price */}
              <tr className="border-b-0 font-normal text-[15px] flex justify-between py-[6px]">
                <td className="w-[450px] justify-start">
                  <Text>Original Price</Text>
                </td>
                <td className="w-[215px] flex justify-center"></td>
                <td className="w-[215px] flex justify-center">
                  <Text>$ {originalPrice.toFixed(0)}</Text>
                </td>
                <td className="w-[215px]"></td>
              </tr>
              {/* tex */}
              <tr className="border-b-0 font-normal text-[15px] flex justify-between py-[6px]">
                <td className="w-[450px] justify-start">
                  <Text>Tex</Text>
                </td>
                <td className="w-[215px] flex justify-center"></td>
                <td className="w-[215px] flex justify-center">
                  <Text>$ {(originalPrice * 0.1).toFixed(0)}</Text>
                </td>
                <td className="w-[215px]"></td>
              </tr>
              {/* subtotal */}
              <tr className="border-b-0 font-medium text-[15px] flex justify-between py-[6px]">
                <td className="w-[450px] justify-start">
                  <Text>SubTotal</Text>
                </td>
                <td className="w-[215px] flex justify-center"></td>
                <td className="w-[215px] flex justify-center">
                  <Text>$ {subTotal.toFixed(0)}</Text>
                </td>
                <td className="w-[215px]"></td>
              </tr>
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayTable;
