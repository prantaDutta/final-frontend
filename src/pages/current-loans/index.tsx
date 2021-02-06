import { NextPageContext } from "next";
import { withIronSession } from "next-iron-session";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { isProduction, NEXT_IRON_SESSION_CONFIG } from "../../utils/constants";
import { redirectToLogin } from "../../utils/functions";
import { ModifiedUserData } from "../../utils/randomTypes";
import { laravelApi } from "../../utils/api";
import FullWidthReactLoader from "../../components/shared/FullWidthReactLoader";
import ReadyMadeTable from "../../components/ReactTable/ReadyMadeTable";
import { Column } from "react-table";

interface currentLoansProps {
  user: ModifiedUserData;
}

const currentLoans: React.FC<currentLoansProps> = ({ user }) => {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);
  const { data, isValidating } = useSWR(
    mounted ? ["/user/all-loans", user.id] : null,
    async (url, id) => {
      const { data } = await laravelApi().post(url, { id });
      return data.data;
    }
  );
  if (data && !isProduction) console.log("data: ", data);
  return (
    <DashboardLayout data={user}>
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Current Loans</h1>
        {user.role === "borrower" && (
          <button
            onClick={() => router.push("/current-loans/new-loan")}
            className="bg-primary text-white p-3 w-1/3 rounded-full tracking-wide
                  font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-primaryAccent
                  shadow-lg transition-css"
          >
            New Loan
          </button>
        )}
      </div>
      <div className="mt-5">
        <p className="text-xl font-semibold my-5">Your Loans</p>
        {data ? (
          <ReadyMadeTable
            title="Current Loans"
            data={data}
            isValidating={isValidating}
            header={LoanTableHeader}
            pagination
            emptyMessage="You Never Deposited Any Money"
          />
        ) : (
          <FullWidthReactLoader />
        )}
      </div>
    </DashboardLayout>
  );
};

export const getServerSideProps = withIronSession(
  async (context: NextPageContext) => {
    const user = (context.req as any).session.get("user");
    if (!user) {
      await redirectToLogin(context?.req, context?.res);
      return { props: {} };
    }

    return {
      props: { user },
    };
  },
  NEXT_IRON_SESSION_CONFIG
);

export default currentLoans;

export const LoanTableHeader: Column[] = [
  {
    Header: "Loan Amount",
    accessor: "amount",
  },
  {
    Header: "Interest Rate",
    accessor: "interestRate",
  },
  {
    Header: "Loan Duration",
    accessor: "loanDuration",
  },
  {
    Header: "Monthly Installment",
    accessor: "monthlyInstallment",
  },
  {
    Header: "Loan Mode",
    accessor: "loanMode",
  },
];
