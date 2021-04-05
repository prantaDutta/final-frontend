import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Cell } from "react-table";
import useSWR from "swr";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import ReadyMadeTable from "../../../components/ReactTable/ReadyMadeTable";
import DashboardTitle from "../../../components/shared/DashboardTitle";
import FlexibleSelectButton from "../../../components/shared/FlexibleSelectButton";
import FullWidthReactLoader from "../../../components/shared/FullWidthReactLoader";
import {
  ModifiedUserData,
  SelectOptionsTypes,
} from "../../../utils/randomTypes";
import withAdminAuth from "../../../utils/withAdminAuth";

interface VerificationRequestsProps {
  user: ModifiedUserData;
}

const LoanRequests: React.FC<VerificationRequestsProps> = ({ user }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);
  const [requestType, setRequestType] = useState<
    "failed" | "processing" | "ongoing" | "finished" | "all"
  >("failed");
  const { data, mutate } = useSWR(
    mounted ? `/admin/loans/${requestType}` : null
  );
  return (
    <DashboardLayout data={user}>
      <div className="flex justify-between">
        <DashboardTitle backButton={false} title="Loans" />
        <FlexibleSelectButton
          selectValue={requestType}
          setSelectValue={setRequestType}
          selectArray={loanModeSelectTypes}
          isValidating={!data}
        />
      </div>

      {data ? (
        <ReadyMadeTable
          title={`${requestType} Loans`}
          data={data.loans}
          pagination
          isValidating={!data}
          header={loanRequestsTableHeader}
          emptyMessage="No New Loan Requests"
          mutateData={() => mutate()}
        />
      ) : (
        <FullWidthReactLoader />
      )}
    </DashboardLayout>
  );
};

export const getServerSideProps = withAdminAuth(async (context) => {
  const { user } = context;
  return { props: { user } };
});

export default LoanRequests;

export const loanRequestsTableHeader = [
  // {
  //   Header: "Name",
  //   accessor: (row: any) => {
  //     let usersName = "";
  //     const len = row.users.length;
  //     row.users.forEach((user: any, i: number) => {
  //       usersName += user.name;
  //       console.log(len);
  //       console.log(i);
  //       if (i !== len - 1) {
  //         usersName += ", ";
  //       }
  //     });
  //     return usersName;
  //   },
  // },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Monthly Installment",
    accessor: "monthlyInstallment",
  },
  {
    Header: "Interest Rate",
    accessor: "interestRate",
  },
  {
    Header: "Loan Duration",
    accessor: "loanDuration",
  },
  {
    Header: "Modified Monthly Installment",
    accessor: "modifiedMonthlyInstallment",
  },
  {
    Header: "Loan Mode",
    accessor: "loanMode",
  },
  {
    Header: "Action",
    accessor: "id",
    Cell: ({ value }: Cell) => (
      <Link href={`/admin/loans/${value}`}>
        <span className="btn bg-primary text-white px-3 py-2">Check</span>
      </Link>
    ),
  },
];

export const loanModeSelectTypes: SelectOptionsTypes[] = [
  {
    title: "Failed",
    value: "failed",
  },
  {
    title: "Processing",
    value: "processing",
  },
  {
    title: "Ongoing",
    value: "ongoing",
  },
  {
    title: "Finished",
    value: "finished",
  },
  {
    title: "all",
    value: "all",
  },
];

export const installmentStatusSelectTypes: SelectOptionsTypes[] = [
  {
    title: "Due",
    value: "due",
  },
  {
    title: "Unpaid",
    value: "unpaid",
  },
  {
    title: "Paid",
    value: "paid",
  },
  {
    title: "all",
    value: "all",
  },
];
