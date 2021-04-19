import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import useSWR from "swr";
import { shouldNotify } from "../../states/userStates";
import { isProduction } from "../../utils/constants";
import { notify } from "../../utils/toasts";
import DashboardTitle from "../shared/DashboardTitle";
import FullWidthReactLoader from "../shared/FullWidthReactLoader";
import DashboardBubble from "./DashboardBubble";

interface DashboardContentProps {}

const UserDashboardContent: React.FC<DashboardContentProps> = ({}) => {
  const shouldNotifyValue = useRecoilValue(shouldNotify);
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);
  const { data /* ,isValidating */ } = useSWR(
    mounted ? `/user/dashboard-data` : null
  );
  if (data && !isProduction) console.log("data: ", data);
  if (data && shouldNotifyValue) {
    if (data.ongoing > 0) {
      // Providing toastId to prevent duplicate toast
      notify(`You have ${data.ongoing} Ongoing Loan(s)`, {
        type: "info",
        toastId: "dashboard-ongoing",
      });
    }

    if (data.processing > 0) {
      notify(`You have ${data.processing} Processing Loan(s)`, {
        type: "info",
        toastId: "dashboard-processing",
      });
    }

    if (data.dueInstallments > 0) {
      notify(`You have ${data.dueInstallments} Due Installment(s)`, {
        type: "info",
        toastId: "due-installments",
      });
    }
  }
  return (
    <div className="">
      <DashboardTitle title="Dashboard" backButton={false} />

      {data ? (
        <div className="grid grid-cols-1 lg:grid-cols-2">
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

          <Link href={`/installments`}>
            <div className="mt-5">
              <DashboardBubble
                title="Due Installments"
                shorterTitle={`${data.dueInstallments} Due Installment(s)`}
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
