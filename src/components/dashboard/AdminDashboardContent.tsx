import DashboardTitle from "../shared/DashboardTitle";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { isProduction } from "../../utils/constants";
import ReadyMadeTable from "../ReactTable/ReadyMadeTable";
import FullWidthReactLoader from "../shared/FullWidthReactLoader";
import { LoanTableHeader } from "../../pages/current-loans";
import { verificationRequestsTableHeader } from "../../pages/admin/verification-requests";

interface DashboardContentProps {}

const AdminDashboardContent: React.FC<DashboardContentProps> = ({}) => {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);
  const { data, isValidating } = useSWR(mounted ? `/admin/recent-data` : null);
  if (data && !isProduction) console.log("data: ", data);
  return (
    <div className="">
      <DashboardTitle title="Dashboard" />

      {data ? (
        <ReadyMadeTable
          title="Verification Requests"
          data={data.verificationRequests}
          isValidating={isValidating}
          header={verificationRequestsTableHeader}
          emptyMessage="No Verification Requests Found"
        />
      ) : (
        <FullWidthReactLoader />
      )}
      {data ? (
        <ReadyMadeTable
          title="Loan Requests"
          data={data.loanRequests}
          isValidating={isValidating}
          header={LoanTableHeader}
          emptyMessage="No Loan Requests Found"
        />
      ) : (
        <FullWidthReactLoader />
      )}
    </div>
  );
};

export default AdminDashboardContent;
