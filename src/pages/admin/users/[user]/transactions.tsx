import React from "react";
import useSWR from "swr";
import DashboardLayout from "../../../../components/layouts/DashboardLayout";
import ReadyMadeTable from "../../../../components/ReactTable/ReadyMadeTable";
import DashboardTitle from "../../../../components/shared/DashboardTitle";
import FetchError from "../../../../components/shared/FetchError";
import FullWidthReactLoader from "../../../../components/shared/FullWidthReactLoader";
import { ModifiedUserData } from "../../../../utils/randomTypes";
import withAdminAuth from "../../../../utils/withAdminAuth";
import { AdminTransactionsTableHeader } from "../../transactions";

interface TransactionsProps {
  user: ModifiedUserData;
  userId: string;
}

const Transactions: React.FC<TransactionsProps> = ({ user, userId }) => {
  const { data, mutate, error } = useSWR(`/admin/user/transactions/${userId}`);
  if (error) {
    return <FetchError user={user} />;
  }
  return (
    <DashboardLayout data={user} title={`User Transaction Details`}>
      <DashboardTitle title={`User Transactions`} backButton />
      {data ? (
        <ReadyMadeTable
          title={`All Transactions By ${data.name}`}
          data={data.transactions}
          pagination
          isValidating={!data}
          header={AdminTransactionsTableHeader}
          emptyMessage="No Transactions Found"
          mutateData={() => mutate()}
        />
      ) : (
        <FullWidthReactLoader />
      )}
    </DashboardLayout>
  );
};

export default Transactions;

export const getServerSideProps = withAdminAuth(async (context) => {
  const { user, query } = context;

  const userId: any = query.user;

  return {
    props: { user, userId },
  };
});
