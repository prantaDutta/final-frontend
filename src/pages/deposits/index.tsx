import { NextPageContext } from "next";
import { withIronSession } from "next-iron-session";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import {
  isProduction,
  LARAVEL_URL,
  NEXT_IRON_SESSION_CONFIG,
} from "../../utils/constants";
import { redirectToLogin } from "../../utils/functions";
import { ModifiedUserData } from "../../utils/randomTypes";
import DashboardTitle from "../../components/shared/DashboardTitle";
import useSWR from "swr";
import ReadyMadeTable from "../../components/ReactTable/ReadyMadeTable";
import FullWidthReactLoader from "../../components/shared/FullWidthReactLoader";

interface dashboardProps {
  user: ModifiedUserData;
}

const dashboard: React.FC<dashboardProps> = ({ user }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);
  const { data, isValidating } = useSWR(
    mounted ? `/user/get-all-deposits/${user.id}` : null
  );
  if (data && !isProduction) console.log("data: ", data);
  const onClick = async () => {
    try {
      window.location.replace(`${LARAVEL_URL}/api/user/deposit`);
    } catch (e) {
      console.log(e.response);
    }
  };
  return (
    <DashboardLayout data={user}>
      <div className="flex justify-between">
        <DashboardTitle title="Deposit Money" />
        <button
          onClick={onClick}
          className="bg-primary text-white p-3 w-1/3 rounded-full tracking-wide
                  font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-primaryAccent
                  shadow-lg transition-css"
        >
          Deposit Money
        </button>
      </div>

      {data ? (
        <ReadyMadeTable
          title="Latest Deposits"
          data={data.transactions}
          isValidating={isValidating}
          header={DepositsTableHeader}
          emptyMessage="You Never Deposited Any Money"
        />
      ) : (
        <FullWidthReactLoader />
      )}
    </DashboardLayout>
  );
};

export const getServerSideProps = withIronSession(
  async (context: NextPageContext) => {
    const user = (context.req as any).session.get("user");
    if (!user) {
      redirectToLogin(context?.req, context?.res);
      return { props: {} };
    }

    return {
      props: { user },
    };
  },
  NEXT_IRON_SESSION_CONFIG
);

export default dashboard;

export const DepositsTableHeader = [
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
    Header: "Transaction Type",
    accessor: "transactionType",
  },
];
