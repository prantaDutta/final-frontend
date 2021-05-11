import Link from "next/link";
import React, { useState } from "react";
import { Cell } from "react-table";
import useSWR from "swr";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import ReadyMadeTable from "../../../components/ReactTable/ReadyMadeTable";
import DashboardTitle from "../../../components/shared/DashboardTitle";
import FetchError from "../../../components/shared/FetchError";
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
  const [requestType, setRequestType] =
    useState<"failed" | "processing" | "ongoing" | "finished" | "all">(
      "failed"
    );
  const { data, mutate, error } = useSWR(`/admin/loans/${requestType}`);
  if (error) {
    return <FetchError user={user} />;
  }
  return (
    <DashboardLayout data={user} title={`User Loans`}>
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
          header={AdminLoansTableHeader}
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

export const AdminLoansTableHeader = [
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
    Header: "Loan Mode",
    accessor: "loanMode",
  },
  {
    Header: "Action",
    accessor: "id",
    Cell: ({ value }: Cell) => (
      <Link href={`/admin/loans/${value}`}>
        <span className="check">Check</span>
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
