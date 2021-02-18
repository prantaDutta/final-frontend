import { withIronSession } from "next-iron-session";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Cell, Column } from "react-table";
import useSWR from "swr";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { NEXT_IRON_SESSION_CONFIG } from "../../../utils/constants";
import { formatDate, redirectToPage } from "../../../utils/functions";
import {
  ModifiedUserData,
  SelectOptionsTypes,
} from "../../../utils/randomTypes";
import ReadyMadeTable from "../../../components/ReactTable/ReadyMadeTable";
import FullWidthReactLoader from "../../../components/shared/FullWidthReactLoader";
import DashboardTitle from "../../../components/shared/DashboardTitle";
import FlexibleSelectButton from "../../../components/shared/FlexibleSelectButton";

interface VerificationRequestsProps {
  user: ModifiedUserData;
}

const WithdrawalRequests: React.FC<VerificationRequestsProps> = ({ user }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);
  const [transactionType, setType] = useState<"deposit" | "withdraw" | "all">(
    "withdraw"
  );
  const [transactionStatus, setStatus] = useState<
    "Pending" | "Completed" | "Failed" | "Canceled" | "all"
  >("Pending");
  const { data, isValidating } = useSWR(
    mounted
      ? `/admin/transactions/${transactionType}/${transactionStatus}`
      : null
  );
  return (
    <DashboardLayout data={user}>
      <div className="flex justify-between">
        <DashboardTitle title="Loan Requests" />
        <FlexibleSelectButton
          selectValue={transactionType}
          setSelectValue={setType}
          selectArray={selectTransactionType}
          isValidating={isValidating}
        />
        <FlexibleSelectButton
          selectValue={transactionStatus}
          setSelectValue={setStatus}
          selectArray={selectTransactionStatusTypes}
          isValidating={isValidating}
        />
      </div>
      {data ? (
        <ReadyMadeTable
          title={`Transactions (${transactionType})`}
          data={data.requests}
          isValidating={isValidating}
          header={AdminTransactionsTableHeader}
          pagination
          emptyMessage="You Don't have new Withdrawal Requests"
        />
      ) : (
        <FullWidthReactLoader />
      )}
    </DashboardLayout>
  );
};

export const getServerSideProps = withIronSession(async ({ req, res }) => {
  const user = req.session.get("user");
  if (!user) {
    await redirectToPage(req, res, "/login");
    return { props: {} };
  }

  return {
    props: { user },
  };
}, NEXT_IRON_SESSION_CONFIG);

export default WithdrawalRequests;

export const AdminTransactionsTableHeader: Column[] = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Transaction Type",
    accessor: "transactionType",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Created At",
    accessor: "createdAt",
    Cell: ({ value }: Cell) => formatDate(value, "MMM D, YYYY h:mm A"),
  },
  {
    Header: "Action",
    accessor: "id",
    Cell: ({ value }: Cell) => (
      <Link href={`/admin/transactions/${value}`}>
        <span className="btn bg-primary text-white px-3 py-2">Check</span>
      </Link>
    ),
  },
];

export const selectTransactionType: SelectOptionsTypes[] = [
  {
    title: "All",
    value: "all",
  },
  {
    title: "Deposits",
    value: "deposit",
  },
  {
    title: "Withdrawals",
    value: "withdraw",
  },
];

export const selectTransactionStatusTypes: SelectOptionsTypes[] = [
  {
    title: "All",
    value: "all",
  },
  {
    title: "Completed",
    value: "Completed",
  },
  {
    title: "Failed",
    value: "Failed",
  },
  {
    title: "Canceled",
    value: "Canceled",
  },
  {
    title: "Pending",
    value: "Pending",
  },
];
