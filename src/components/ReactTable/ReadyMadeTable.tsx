import React, { useMemo, useState } from "react";
import { Column } from "react-table";
import ReactLoader from "../shared/ReactLoader";
import SvgIcon from "../shared/SvgIcon";
import ResponsiveReactTable from "./ResponsiveReactTable";

interface ReadyMadeTableProps {
  title: string;
  data: any;
  isValidating: boolean;
  header: Column[];
  pagination?: boolean;
  emptyMessage: string;
  mutateData: () => void;
}

const ReadyMadeTable: React.FC<ReadyMadeTableProps> = ({
  title,
  data,
  isValidating,
  header,
  emptyMessage,
  mutateData,
  pagination = false,
}) => {
  // creating columns and header for react table
  const columns = useMemo(() => header, [data]);
  const tableData = useMemo(() => data, [data]);

  const [refreshing, setRefreshing] = useState(false);
  return (
    <>
      <div className="md:py-4 flex justify-between">
        <h1 className="text-xl md:text-3xl font-semibold capitalize">
          {title}
        </h1>
        <button
          onClick={() => {
            setRefreshing(true);
            mutateData();
            setTimeout(() => {
              setRefreshing(false);
            }, 1000);
          }}
          className="edit-btn flex items-center bg-primary"
        >
          <h4 className="hidden md:block capitalize px-2">Refresh</h4>
          <SvgIcon
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            classNames={`w-4 h-4 ${refreshing && "animate-spin"}`}
          />
        </button>
      </div>
      {!isValidating ? (
        data && data.length > 0 ? (
          <div className="mt-5 md:mt-0">
            <ResponsiveReactTable
              data={tableData}
              columns={columns}
              pagination={pagination}
            />
          </div>
        ) : (
          <p className="font-semibold font-xl">{emptyMessage}</p>
        )
      ) : (
        <button
          className="bg-transparent text-primary p-3 w-full tracking-wide
                  font-semibold font-display focus:outline-none focus:shadow-outline
                  transition-css"
        >
          <ReactLoader />
        </button>
      )}
    </>
  );
};

export default ReadyMadeTable;
