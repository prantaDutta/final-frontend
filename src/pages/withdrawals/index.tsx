import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ReadyMadeTable from "../../components/ReactTable/ReadyMadeTable";
import DashboardTitle from "../../components/shared/DashboardTitle";
import FullWidthReactLoader from "../../components/shared/FullWidthReactLoader";
import { isProduction } from "../../utils/constants";
import { ModifiedUserData } from "../../utils/randomTypes";
import withAuth from "../../utils/withAuth";
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
        <DashboardTitle backButton={false} title="Withdraw Money" />
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

export const getServerSideProps = withAuth(async (context) => {
  const { user } = context;
  return { props: { user } };
});

export default Withdrawals;
