import { NextPageContext } from "next";
import { withIronSession } from "next-iron-session";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { isProduction, NEXT_IRON_SESSION_CONFIG } from "../../utils/constants";
import { redirectToLogin } from "../../utils/functions";
import { ModifiedUserData } from "../../utils/randomTypes";
import DashboardTitle from "../../components/shared/DashboardTitle";
import useSWR from "swr";
import ReadyMadeTable from "../../components/ReactTable/ReadyMadeTable";
import FullWidthReactLoader from "../../components/shared/FullWidthReactLoader";
import { useRouter } from "next/router";
import { TransactionsTableHeader } from "../deposits";

interface dashboardProps {
  user: ModifiedUserData;
}

const Withdrawals: React.FC<dashboardProps> = ({ user }) => {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);
  const { data, isValidating } = useSWR(
    mounted ? `/user/get-all-withdrawals` : null
  );
  if (data && !isProduction) console.log("data: ", data);

  return (
    <DashboardLayout data={user}>
      <div className="flex justify-between">
        <DashboardTitle title="Withdraw Money" />
        <button
          onClick={() => router.push("/withdrawals/withdraw")}
          className="bg-primary text-white p-3 w-1/3 rounded-full tracking-wide
                  font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-primaryAccent
                  shadow-lg transition-css"
        >
          Withdraw Money
        </button>
      </div>

      {data ? (
        <ReadyMadeTable
          title="Latest Withdrawals"
          data={data.transactions}
          isValidating={isValidating}
          header={TransactionsTableHeader}
          pagination
          emptyMessage="You have never Withdrawn any Money"
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
      await redirectToLogin(context?.req, context?.res);
      return { props: {} };
    }

    return {
      props: { user },
    };
  },
  NEXT_IRON_SESSION_CONFIG
);

export default Withdrawals;
