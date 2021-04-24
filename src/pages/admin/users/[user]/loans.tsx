import React, { useEffect, useState } from "react";
import useSWR from "swr";
import DashboardLayout from "../../../../components/layouts/DashboardLayout";
import ReadyMadeTable from "../../../../components/ReactTable/ReadyMadeTable";
import DashboardTitle from "../../../../components/shared/DashboardTitle";
import FullWidthReactLoader from "../../../../components/shared/FullWidthReactLoader";
import { ModifiedUserData } from "../../../../utils/randomTypes";
import withAdminAuth from "../../../../utils/withAdminAuth";
import { AdminLoansTableHeader } from "../../loans";

interface LoansProps {
  user: ModifiedUserData;
  userId: string;
}

const Loans: React.FC<LoansProps> = ({ user, userId }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { data, mutate } = useSWR(
    mounted ? `/admin/user/loans/${userId}` : null
  );
  return (
    <DashboardLayout data={user} title={`User Loan Details`}>
      <DashboardTitle title={`User Loans`} backButton />
      {data ? (
        <ReadyMadeTable
          title={`All Loans By ${data.name}`}
          data={data.loans}
          pagination
          isValidating={!data}
          header={AdminLoansTableHeader}
          emptyMessage="No Loans Found"
          mutateData={() => mutate()}
        />
      ) : (
        <FullWidthReactLoader />
      )}
    </DashboardLayout>
  );
};

export default Loans;

export const getServerSideProps = withAdminAuth(async (context) => {
  const { user, query } = context;

  const userId: any = query.user;

  return {
    props: { user, userId },
  };
});
