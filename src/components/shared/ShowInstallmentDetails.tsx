import React from "react";
import SingleTableRow from "./SingleTableRow";

interface ShowInstallmentDetailsProps {
  dataArray: any[][];
  tableClass?: string;
  theadRowClass?: string;
  tdClass?: string;
}

const ShowInstallmentDetails: React.FC<ShowInstallmentDetailsProps> = ({
  dataArray,
  tableClass = "w-3/4 shadow-lg bg-white text-center mt-5 m-auto",
  theadRowClass = "bg-primary font-semibold border px-8 py-4 text-gray-100",
  tdClass = "font-semibold border px-8 py-4 capitalize",
}) => {
  return (
    <table className={tableClass}>
      <thead className="bg-gray-400">
        <tr className={theadRowClass}>
          <th className={tdClass}>Name</th>
          <th className={tdClass}>Data</th>
        </tr>
      </thead>

      <tbody>
        {dataArray.map((d: any, i: number) => {
          return <SingleTableRow d0={d[0]} d1={d[1]} i={i} key={i} />;
        })}
      </tbody>
    </table>
  );
};

export default ShowInstallmentDetails;
