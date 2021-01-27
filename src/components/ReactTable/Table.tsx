import React from "react";
import { Column, usePagination, useTable } from "react-table";

interface TableProps {
  columns: Column<{}>[];
  data: {}[];
  tableClass?: string;
  theadClass?: string;
  tbodyClass?: string;
  trClass?: string;
  tdClass?: string;
  thClass?: string;
  pagination?: boolean;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  tableClass,
  theadClass,
  tbodyClass,
  trClass,
  tdClass,
  thClass,
  pagination = false,
}) => {
  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    prepareRow,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 5,
      },
    },
    usePagination
  );
  const { pageIndex, pageSize } = state;

  return (
    <>
      <table {...getTableProps()} className={tableClass}>
        <thead className={theadClass}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className={trClass}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className={thClass}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className={tbodyClass}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className={`${i % 2 != 0 ? "bg-gray-300" : ""} cursor-pointer`}
              >
                {row.cells.map((cell) => {
                  return (
                    <td className={tdClass} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {pagination && (
        <div className="flex justify-between mt-5">
          <button
            className="p-2 w-1/5"
            disabled={!canPreviousPage}
            onClick={() => gotoPage(0)}
          >
            <svg
              className="w-6 h-6 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              ></path>
            </svg>
          </button>
          <button
            className="p-2 w-1/5 bg-primary text-white rounded-lg"
            disabled={!canPreviousPage}
            onClick={() => previousPage()}
          >
            Previous
          </button>
          <button className="p-2 w-1/5">
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </button>
          <div className="p-2 w-1/5 flex">
            <p>Go to Page: </p>
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value
                  ? Number(e.target.value) - 1
                  : 0;
                gotoPage(pageNumber);
              }}
              className="w-1/5 text-center bg-transparent"
            />
          </div>
          <select
            className="p-2 w-1/5 mx-2 bg-transparent"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[5, 10, 25, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
          <button
            className="p-2 w-1/5 bg-primary text-white rounded-lg"
            disabled={!canNextPage}
            onClick={() => nextPage()}
          >
            Next
          </button>
          <button
            className="p-2 w-1/5"
            disabled={!canNextPage}
            onClick={() => gotoPage(pageCount - 1)}
          >
            <svg
              className="w-6 h-6 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default Table;
