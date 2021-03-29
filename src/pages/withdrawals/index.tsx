import { withIronSession } from "next-iron-session";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ReadyMadeTable from "../../components/ReactTable/ReadyMadeTable";
import DashboardTitle from "../../components/shared/DashboardTitle";
import FullWidthReactLoader from "../../components/shared/FullWidthReactLoader";
import { isProduction, NEXT_IRON_SESSION_CONFIG } from "../../utils/constants";
import { redirectToPage } from "../../utils/functions";
import { ModifiedUserData } from "../../utils/randomTypes";
import { TransactionsTableHeader } from "../deposits";

interface dashboardProps {
  user: ModifiedUserData;
}

const Withdrawals: React.FC<dashboardProps> = ({ user }) => {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);
  const { data, mutate } = useSWR(mounted ? `/user/get-all-withdrawals` : null);
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
          isValidating={!data}
          header={TransactionsTableHeader}
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

export default Withdrawals;
