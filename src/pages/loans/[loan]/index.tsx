import React, { useEffect, useState } from "react";
import useSWR from "swr";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DashboardTitle from "../../../components/shared/DashboardTitle";
import FullWidthReactLoader from "../../../components/shared/FullWidthReactLoader";
import ShowDetailsInATableWithLinks from "../../../components/shared/ShowDetailsInATableWithLinks";
import { objectToArrayAndExclude } from "../../../utils/functions";
import { ModifiedUserData } from "../../../utils/randomTypes";
import withAuth from "../../../utils/withAuth";
import ErrorPage from "../../404";

interface UserLoanProps {
  user: ModifiedUserData;
  loanId: string;
}

const UserLoan: React.FC<UserLoanProps> = ({ user, loanId }) => {
  if (!loanId) return <ErrorPage />;

  const [mounted, useMounted] = useState<boolean>(false);
  useEffect(() => useMounted(true), []);
  let { data } = useSWR(mounted ? `/user/get-single-loan/${loanId}` : null);

  return (
    <DashboardLayout data={user} title={`Loan Details`}>
      <DashboardTitle title={`Loan Details`} />
      {data ? (
        <>
          <ShowDetailsInATableWithLinks
            title="Loan Data"
            dataArray={objectToArrayAndExclude(data.loan, [
              "id",
              "uniqueLoanId",
            ])}
          />

          <ShowDetailsInATableWithLinks
            title="Installment Data"
            dataArray={objectToArrayAndExclude(data.totalInstallments)}
            urlArray={[`/loans/${data.loan.id}/loan-installments`]}
          />
        </>
      ) : (
        <FullWidthReactLoader />
      )}
    </DashboardLayout>
  );
};

export default UserLoan;

export const getServerSideProps = withAuth(async (context) => {
  const { user, query } = context;

  const loanId: string = query.loan;

  return {
    props: { user, loanId },
  };
});

// export const generateLenderIdArray = (arr: string[]) => {
//   let newArr: string[] = [];

//   arr.forEach((ar) => {
//     newArr.push(`/admin/users/${ar}`);
//   });

//   return newArr;
// };
