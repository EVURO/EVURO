import { TfiAngleLeft, TfiAngleRight } from 'react-icons/tfi';
import { useEffect } from 'react';
import {
  flexRender,
  getFilteredRowModel,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';
import { Text } from '../../../components';

interface TablePropsTypes {
  data: Record<string, any>[];
  columns: any[];
  globalSearch?: string;
  totalAmount?: number;
}

const Table = ({
  data,
  columns,
  globalSearch,
  totalAmount,
}: TablePropsTypes) => {
  // console.log('data in table ==============', data);
  // console.log('totalAmount prop========', totalAmount);
  const table = useReactTable({
    data,
    columns,
    state: { globalFilter: globalSearch },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    table.setPageSize(10);
  }, [table]);

  return (
    <div className="overflow-x-auto rounded-xl pb-6 overflow-y-hidden min-h-[40vh]">
      <table className="table">
        {/* head */}
        <thead className="w-full h-auto bg-gradient-to-r from-darkBlue  to-darkBlue/60 text-dashboardLayoutBackground">
          {table.getHeaderGroups()?.map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="text-center h-16 text-sm font-semibold"
            >
              {headerGroup.headers?.map((header) => (
                <th key={header.id}>
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
          {/* row 1 */}
          {table?.getRowModel()?.rows?.length ? (
            table?.getRowModel()?.rows?.map((row) => (
              <tr key={row.id}>
                {row?.getVisibleCells()?.map((cell) => (
                  <td
                    key={cell.id}
                    className={`capitalize text-center ${
                      cell.id === '0_Complaint' ? 'w-[35%]' : ''
                    }`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center">
                {' '}
                No Record found.
              </td>
            </tr>
          )}
          <tr className="my-11"></tr>
        </tbody>
        {/* foot */}
      </table>

      {totalAmount !== undefined && (
        <Text className="text-right pr-3 md:pr-7 lg:pr-9 mt-3 font-medium text-md">
          Total Sum : {totalAmount}
        </Text>
      )}

      {/* only show pagination when length of data is more than 10 */}
      {/* {data.length > 10 && ( */}
      <div className="flex flex-row justify-end pr-3 md:pr-7 lg:pr-9 mt-3">
        <div className="join rounded-xl gap-2">
          <button
            className="join-item btn btn-sm rounded-tl-xl bg-euvroWhite hover:bg-[#11B0F0] shadow-paginationShadow border-none text-euvroBlack"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <TfiAngleLeft size={15} />
          </button>
          <button className="join-item btn btn-sm bg-euvroWhite hover:bg-[#11B0F0] shadow-paginationShadow border-none text-euvroBlack">
            {table.getState().pagination.pageIndex + 1}
          </button>
          <button
            className="join-item btn btn-sm rounded-tr-xl border-none shadow-paginationShadow bg-euvroWhite hover:bg-[#11B0F0] text-euvroBlack"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {' '}
            <TfiAngleRight size={15} />
          </button>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default Table;
