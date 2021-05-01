import React, { useEffect, useState } from "react";
import useSWR from "swr";
import DashboardLayout from "../../../../components/layouts/DashboardLayout";
import DashboardTitle from "../../../../components/shared/DashboardTitle";
import FullWidthReactLoader from "../../../../components/shared/FullWidthReactLoader";
import ShowDetailsInATableWithLinks from "../../../../components/shared/ShowDetailsInATableWithLinks";
import { objectToArrayAndExclude } from "../../../../utils/functions";
import { ModifiedUserData } from "../../../../utils/randomTypes";
import withAdminAuth from "../../../../utils/withAdminAuth";
import ErrorPage from "../../../404";
import FetchError from "../../../../components/shared/FetchError";

interface LoanProps {
  user: ModifiedUserData;
  loanId: string;
}

const Loan: React.FC<LoanProps> = ({ user, loanId }) => {
  if (!loanId) return <ErrorPage />;

  const [mounted, useMounted] = useState<boolean>(false);
  useEffect(() => useMounted(true), []);
  const { data, error } = useSWR(mounted ? `/admin/get-single-loan/${loanId}` : null);
  if (mounted && error) {
    return <FetchError user={user}/>
  }
  return (
    <DashboardLayout data={user} title={`Loan Details`}>
      <div className="md:flex justify-between">
        <DashboardTitle title={`Loan Details`} />
        {/* {data && data.loan.loanMode === "failed" && (
          <button
            onClick={() => router.push(`/admin/loans/${loanId}/distribute`)}
            className="px-4 py-2 bg-primary text-white rounded-lg font-semibold focus:outline-none focus:ring-0"
          >
            Do Something
          </button>
        )} */}
      </div>
      {data ? (
        <>
          <ShowDetailsInATableWithLinks
            title="Loan Data"
            dataArray={objectToArrayAndExclude(data.loan, ["id"])}
          />

          <ShowDetailsInATableWithLinks
            title="Borrower Data"
            dataArray={objectToArrayAndExclude(data.theBorrower)}
            thDataArray={["name", "amount"]}
            urlArray={[`/admin/users/${data.borrowerId[0]}`]}
            dataIsLink={false}
          />

          <ShowDetailsInATableWithLinks
            title="Lender Data"
            dataArray={objectToArrayAndExclude(data.theLenders)}
            urlArray={generateLenderIdArray(data.lenderIds)}
            thDataArray={["name", "amount"]}
            dataIsLink={false}
          />

          <ShowDetailsInATableWithLinks
            title="Total Installments"
            dataArray={objectToArrayAndExclude(data.totalInstallments)}
            urlArray={[`/admin/loans/${loanId}/loan-installments`]}
          />
        </>
      ) : (
        <FullWidthReactLoader />
      )}
    </DashboardLayout>
  );
};

export const getServerSideProps = withAdminAuth(async (context) => {
  const { user, query } = context;

  const loanId: string = query.loan;

  return {
    props: { user, loanId },
  };
});

export default Loan;

export const generateLenderIdArray = (arr: string[]) => {
  let newArr: string[] = [];

  arr.forEach((ar) => newArr.push(`/admin/users/${ar}`));

  return newArr;
};
