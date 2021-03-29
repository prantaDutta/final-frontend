import Link from "next/link";
import React from "react";
import SingleTableRow from "./SingleTableRow";

interface ShowDetailsProps {
  dataArray: any[][];
  loanData?: any;
  theUser?: any;
  userTitle: string;
  tableClass?: string;
  theadRowClass?: string;
  tdClass?: string;
}

const ShowDetails: React.FC<ShowDetailsProps> = ({
  dataArray,
  loanData,
  theUser,
  userTitle,
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
        {theUser && (
          <tr className="bg-gray-300">
            <td className={tdClass}>{userTitle}</td>
            <td className={tdClass + " text-primary"}>
              <Link href={`/admin/users/${theUser.id}`}>{theUser.name}</Link>
            </td>
            <td className={tdClass}>{theUser.amount}</td>
          </tr>
        )}

        {loanData.theLenders &&
          loanData.theLenders.map((lender: any, i: number) => {
            return (
              <tr key={lender.id} className={`${i % 2 !== 0 && "bg-gray-300"}`}>
                <td className={tdClass}>Lender {i + 1}</td>
                <td className={tdClass + " text-primary"}>
                  <Link href={`/admin/users/${lender.id}`}>{lender.name}</Link>
                </td>
                <td className={tdClass}>{lender.amount}</td>
              </tr>
            );
          })}

        {dataArray.map((d: any, i: number) => {
          return <SingleTableRow d0={d[0]} d1={d[1]} i={i} key={i} />;
        })}
      </tbody>
    </table>
  );
};

export default ShowDetails;
