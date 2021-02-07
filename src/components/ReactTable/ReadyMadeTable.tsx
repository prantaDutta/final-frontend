import React, { useMemo } from "react";
import ReactTable from "./ReactTable";
import ReactLoader from "../shared/ReactLoader";
import { Column } from "react-table";

interface ReadyMadeTableProps {
  title: string;
  data: any;
  isValidating: boolean;
  header: Column[];
  pagination?: boolean;
  emptyMessage: string;
}

const ReadyMadeTable: React.FC<ReadyMadeTableProps> = ({
  title,
  data,
  isValidating,
  header,
  emptyMessage,
  pagination = false,
}) => {
  // creating columns and header for react table
  const columns = useMemo(() => header, [data]);
  const tableData = useMemo(() => data, [data]);
  return (
    <>
      <div className="py-4 flex justify-between">
        <h1 className="text-3xl font-semibold capitalize">{title}</h1>
      </div>
      {!isValidating ? (
        data && data.length > 0 ? (
          <ReactTable
            data={tableData}
            columns={columns}
            pagination={pagination}
          />
        ) : (
          <p className="font-semibold font-xl">{emptyMessage}</p>
        )
      ) : null}
      {isValidating && (
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
