import React from 'react'
import { Column, usePagination, useTable } from 'react-table'
import SvgIcon from '../shared/SvgIcon'

interface ResponsiveTableProps {
  columns: Column[]
  data: {}[]
  tableClass?: string
  theadClass?: string
  tbodyClass?: string
  trClass?: string
  tdClass?: string
  thClass?: string
  pagination?: boolean
}

const ResponsiveReactTable: React.FC<ResponsiveTableProps> = ({
  columns,
  data,
  tableClass = 'border-collapse table-fixed w-full',
  theadClass = '',
  thClass = 'p-3 font-semibold uppercase bg-primary text-white border border-gray-300 hidden lg:table-cell',
  tbodyClass,
  trClass = 'bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0',
  tdClass = 'w-full lg:w-auto p-2 md:p-3 text-gray-800 text-right lg:text-center font-semibold border border-b block lg:table-cell relative lg:static',
  pagination = false
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
    // pageOptions,
    state,
    gotoPage,
    pageCount,
    prepareRow,
    setPageSize
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 5
      }
    },
    usePagination
  )
  const { pageIndex, pageSize } = state

  return (
    <>
      <table {...getTableProps()} className={tableClass}>
        <thead className={theadClass}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className={thClass}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className={tbodyClass}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} className={`${trClass} {i % 2 != 0 ? "bg-gray-300" : ""} cursor-pointer`}>
                {row.cells.map((cell, i) => {
                  return (
                    <td className={tdClass} {...cell.getCellProps()}>
                      {cell.render('Cell')}
                      <span className="lg:hidden absolute top-2 left-0 bg-primary text-white rounded-lg px-2 py-1 text-xs font-bold uppercase">
                        {columns[i].Header}
                      </span>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      {pagination && (
        <>
          <div className="flex justify-between md:mt-5 pb-5">
            {/* Goto Page 0 */}
            <button className="p-2 w-1/6" disabled={!canPreviousPage} onClick={() => gotoPage(0)}>
              <svg
                className="w-6 h-6 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
            {/* Go to previous page */}
            {/* For Large Screen */}
            <button
              className="px-2 w-1/3 md:w-1/6 bg-primary text-white font-semibold rounded-lg"
              disabled={!canPreviousPage}
              onClick={() => previousPage()}
            >
              Previous
            </button>

            {/* Goto a specific page */}
            <div className="hidden md:flex md:ml-2 p-2 w-1/4">
              <p className="font-semibold">Go to Page: </p>
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                  gotoPage(pageNumber)
                }}
                className="w-1/5 text-center bg-transparent"
              />
              <p className="font-bold"> of {pageCount}</p>
            </div>
            {/* How many rows to show */}
            <select
              className="hidden md:block p-2 w-1/5 mx-2 bg-transparent font-semibold"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[5, 10, 25, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
            {/* Goto the Next Page */}
            <button
              className="w-1/4 md:w-1/6 bg-primary text-white rounded-lg font-semibold"
              disabled={!canNextPage}
              onClick={() => nextPage()}
            >
              Next
            </button>
            {/* Goto the last Page */}
            <button className="p-2 w-1/5" disabled={!canNextPage} onClick={() => gotoPage(pageCount - 1)}>
              <SvgIcon classNames="w-6 h-6 mx-auto" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </button>
          </div>
          <div className="flex justify-center md:hidden pb-5">
            <p>Go to Page: </p>
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(pageNumber)
              }}
              className="w-1/5 text-center bg-transparent"
            />
            <p> of {pageCount}</p>
          </div>
        </>
      )}
    </>
  )
}

export default ResponsiveReactTable
