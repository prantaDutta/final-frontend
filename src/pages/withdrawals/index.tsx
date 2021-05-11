import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Cell, Column } from "react-table";
import useSWR from "swr";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ReadyMadeTable from "../../components/ReactTable/ReadyMadeTable";
import DashboardTitle from "../../components/shared/DashboardTitle";
import FetchError from "../../components/shared/FetchError";
import FullWidthReactLoader from "../../components/shared/FullWidthReactLoader";
import { isProduction } from "../../utils/constants";
import { ModifiedUserData } from "../../utils/randomTypes";
import withAuth from "../../utils/withAuth";

interface dashboardProps {
  user: ModifiedUserData;
}

const Withdrawals: React.FC<dashboardProps> = ({ user }) => {
  const router = useRouter();
  const { data, mutate, error } = useSWR(`/user/get-all-withdrawals`);
  if (data && !isProduction) console.log("data: ", data);

  if (error) {
    return <FetchError user={user} />;
  }
  return (
    <DashboardLayout data={user} title={`Withdrawals`}>
      <div className="flex justify-between my-2">
        <DashboardTitle backButton={false} title="Withdraw Money" />
        <button
          onClick={() => router.push("/withdrawals/withdraw")}
          className="primary-btn"
        >
          Withdraw Money
        </button>
      </div>

      {data ? (
        <ReadyMadeTable
          title="Latest Withdrawals"
          data={data.transactions}
          isValidating={!data}
          header={withdrawalsTableHeader}
          pagination
          emptyMessage="You have never Withdrawn any Money"
          mutateData={() => mutate()}
        />
      ) : (
        <FullWidthReactLoader />
      )}
    </DashboardLayout>
  );
};

export const getServerSideProps = withAuth(async (context) => {
  const { user } = context;
  return { props: { user } };
});

export default Withdrawals;

export const withdrawalsTableHeader: Column[] = [
  {
    Header: "Transaction Id",
    accessor: "transactionId",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "id",
    Cell: ({ value }: Cell) => (
      <Link href={`/withdrawals/${value}`}>
        <span className="btn bg-primary text-white px-3 py-2">Check</span>
      </Link>
    ),
  },
];
