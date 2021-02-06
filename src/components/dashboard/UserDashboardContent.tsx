import DashboardTitle from "../shared/DashboardTitle";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { isProduction } from "../../utils/constants";
import ReadyMadeTable from "../ReactTable/ReadyMadeTable";
import FullWidthReactLoader from "../shared/FullWidthReactLoader";
import { LoanTableHeader } from "../../pages/current-loans";
import { TransactionsTableHeader } from "../../pages/deposits";

interface DashboardContentProps {}

const UserDashboardContent: React.FC<DashboardContentProps> = ({}) => {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);
  const { data, isValidating } = useSWR(mounted ? `/user/recent-data` : null);
  if (data && !isProduction) console.log("data: ", data);
  return (
    <div className="">
      <DashboardTitle title="Dashboard" />

      {data ? (
        <ReadyMadeTable
          title="Recent Loans"
          data={data.loans}
          isValidating={isValidating}
          header={LoanTableHeader}
          emptyMessage="No Loans Found"
        />
      ) : (
        <FullWidthReactLoader />
      )}
      {data ? (
        <ReadyMadeTable
          title="Recent Transactions"
          data={data.transactions}
          isValidating={isValidating}
          header={TransactionsTableHeader}
          emptyMessage="No Transactions Found"
        />
      ) : (
        <FullWidthReactLoader />
      )}
    </div>
  );
};

export default UserDashboardContent;
