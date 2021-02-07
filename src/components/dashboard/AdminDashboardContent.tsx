import DashboardTitle from "../shared/DashboardTitle";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { isProduction } from "../../utils/constants";
import DashboardBubble from "./DashboardBubble";
import FullWidthReactLoader from "../shared/FullWidthReactLoader";
import Link from "next/link";

interface DashboardContentProps {}

const AdminDashboardContent: React.FC<DashboardContentProps> = ({}) => {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);
  const { data /* , isValidating */ } = useSWR(
    mounted ? `/admin/dashboard-data` : null
  );
  if (data && !isProduction) console.log("data: ", data);
  return (
    <div className="">
      <DashboardTitle title="Dashboard" />

      {data ? (
        <div className="grid grid-cols-2">
          <Link href={`/admin/loans`}>
            <div className="mt-5">
              <DashboardBubble
                title="Loan Requests"
                shorterTitle={`${data.loans} New Loan Request(s)`}
              />
            </div>
          </Link>
          <Link href={`/admin/transactions`}>
            <div className="mt-5">
              <DashboardBubble
                title="Withdrawal Requests"
                shorterTitle={`${data.withdrawals} New Withdrawal Request(s)`}
              />
            </div>
          </Link>

          <Link href={`/admin/users`}>
            <div className="mt-5">
              <DashboardBubble
                title="Verification Requests"
                shorterTitle={`${data.verifications} New Verification Request(s)`}
              />
            </div>
          </Link>
        </div>
      ) : (
        <FullWidthReactLoader />
      )}

      {/*{data ? (*/}
      {/*  <ReadyMadeTable*/}
      {/*    title="Verification Requests"*/}
      {/*    data={data.verificationRequests}*/}
      {/*    isValidating={isValidating}*/}
      {/*    header={verificationRequestsTableHeader}*/}
      {/*    emptyMessage="No Verification Requests Found"*/}
      {/*  />*/}
      {/*) : (*/}
      {/*  <FullWidthReactLoader />*/}
      {/*)}*/}
      {/*{data ? (*/}
      {/*  <ReadyMadeTable*/}
      {/*    title="Loan Requests"*/}
      {/*    data={data.loanRequests}*/}
      {/*    isValidating={isValidating}*/}
      {/*    header={LoanTableHeader}*/}
      {/*    emptyMessage="No Loan Requests Found"*/}
      {/*  />*/}
      {/*) : (*/}
      {/*  <FullWidthReactLoader />*/}
      {/*)}*/}
    </div>
  );
};

export default AdminDashboardContent;
