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
      <div className="py-4">
        <h1 className="text-3xl font-semibold">{title}</h1>
      </div>
      {!isValidating ? (
        data && data.length > 0 ? (
          <ReactTable
            data={tableData}
            columns={columns}
            tableClass="w-full shadow-lg bg-white text-center"
            thClass="bg-primary font-semibold border px-8 py-4"
            tdClass="font-semibold border px-8 py-4 capitalize"
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
                  shadow-lg transition-css"
        >
          <ReactLoader />
        </button>
      )}
    </>
  );
};

export default ReadyMadeTable;
