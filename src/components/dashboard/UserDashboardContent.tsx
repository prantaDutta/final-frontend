import DashboardTitle from "../shared/DashboardTitle";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { isProduction } from "../../utils/constants";
import DashboardBubble from "./DashboardBubble";
import FullWidthReactLoader from "../shared/FullWidthReactLoader";
import Link from "next/link";

interface DashboardContentProps {}

const UserDashboardContent: React.FC<DashboardContentProps> = ({}) => {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);
  const { data /* ,isValidating */ } = useSWR(
    mounted ? `/user/dashboard-data` : null
  );
  if (data && !isProduction) console.log("data: ", data);
  return (
    <div className="">
      <DashboardTitle title="Dashboard" />

      {data ? (
        <div className="grid grid-cols-2">
          <Link href={`/current-loans`}>
            <div className="mt-5">
              <DashboardBubble
                title="Recent Loans"
                shorterTitle={`${data.processing} Processing, ${data.finished} Finished, ${data.ongoing} Ongoing`}
              />
            </div>
          </Link>

          <Link href={`/deposits`}>
            <div className="mt-5">
              <DashboardBubble
                title="Recent Transactions"
                shorterTitle={`${data.deposits} Deposit(s), ${data.withdrawals} Withdrawal(s)`}
              />
            </div>
          </Link>
        </div>
      ) : (
        <FullWidthReactLoader />
      )}

      {/*{data ? (*/}
      {/*  <ReadyMadeTable*/}
      {/*    title="Recent Loans"*/}
      {/*    data={data.loans}*/}
      {/*    isValidating={isValidating}*/}
      {/*    header={LoanTableHeader}*/}
      {/*    emptyMessage="No Loans Found"*/}
      {/*  />*/}
      {/*) : (*/}
      {/*  <FullWidthReactLoader />*/}
      {/*)}*/}
      {/*{data ? (*/}
      {/*  <ReadyMadeTable*/}
      {/*    title="Recent Transactions"*/}
      {/*    data={data.transactions}*/}
      {/*    isValidating={isValidating}*/}
      {/*    header={TransactionsTableHeader}*/}
      {/*    emptyMessage="No Transactions Found"*/}
      {/*  />*/}
      {/*) : (*/}
      {/*  <FullWidthReactLoader />*/}
      {/*)}*/}
    </div>
  );
};

export default UserDashboardContent;
