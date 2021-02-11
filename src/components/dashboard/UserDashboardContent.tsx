import DashboardTitle from "../shared/DashboardTitle";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { isProduction } from "../../utils/constants";
import DashboardBubble from "./DashboardBubble";
import FullWidthReactLoader from "../shared/FullWidthReactLoader";
import Link from "next/link";
import { notify } from "../../utils/toasts";

interface DashboardContentProps {}

const UserDashboardContent: React.FC<DashboardContentProps> = ({}) => {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);
  const { data /* ,isValidating */ } = useSWR(
    mounted ? `/user/dashboard-data` : null
  );
  if (data && !isProduction) console.log("data: ", data);
  if (data) {
    if (data.ongoing > 0) {
      // Providing toastId to prevent duplicate toast
      notify(`You have ${data.ongoing} Ongoing Loans`, {
        type: "info",
        toastId: "dashboard-ongoing",
      });
    }

    if (data.processing > 0) {
      notify(`You have ${data.processing} Processing Loans`, {
        type: "info",
        toastId: "dashboard-processing",
      });
    }
  }
  return (
    <div className="">
      <DashboardTitle title="Dashboard" />

      {data ? (
        <div className="grid grid-cols-2">
          <Link href={`/loans`}>
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
    </div>
  );
};

export default UserDashboardContent;
