import { withIronSession } from "next-iron-session";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DashboardTitle from "../../../components/shared/DashboardTitle";
import FullWidthReactLoader from "../../../components/shared/FullWidthReactLoader";
import ShowDetails from "../../../components/shared/ShowDetails";
import { NEXT_IRON_SESSION_CONFIG } from "../../../utils/constants";
import { objectToArray, redirectToPage } from "../../../utils/functions";
import { ModifiedUserData } from "../../../utils/randomTypes";
import ErrorPage from "../../404";

interface LoanProps {
  user: ModifiedUserData;
  loanId: string;
}

const Loan: React.FC<LoanProps> = ({ user, loanId }) => {
  if (!loanId) return <ErrorPage />;

  const [mounted, useMounted] = useState<boolean>(false);
  useEffect(() => useMounted(true), []);
  let { data } = useSWR(mounted ? `/admin/get-single-loan/${loanId}` : null);

  return (
    <DashboardLayout data={user}>
      <DashboardTitle title={`Loan Details`} />
      {data ? (
        <ShowDetails
          dataArray={objectToArray(data.loan)}
          loanData={data}
          theUser={data.theBorrower}
          userTitle="The Borrower"
        />
      ) : (
        <FullWidthReactLoader />
      )}
    </DashboardLayout>
  );
};

export const getServerSideProps = withIronSession(
  async ({ req, res, query }) => {
    const user = req.session.get("user");
    if (!user) {
      await redirectToPage(req, res, "/login");
      return { props: {} };
    }

    const loanId: string = query.loan;

    return {
      props: { user, loanId },
    };
  },
  NEXT_IRON_SESSION_CONFIG
);

export default Loan;
