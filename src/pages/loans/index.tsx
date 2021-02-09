import { NextPageContext } from "next";
import { withIronSession } from "next-iron-session";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { isProduction, NEXT_IRON_SESSION_CONFIG } from "../../utils/constants";
import { redirectToLogin } from "../../utils/functions";
import { ModifiedUserData } from "../../utils/randomTypes";
import FullWidthReactLoader from "../../components/shared/FullWidthReactLoader";
import ReadyMadeTable from "../../components/ReactTable/ReadyMadeTable";
import { Column } from "react-table";
import DashboardTitle from "../../components/shared/DashboardTitle";
import FlexibleSelectButton from "../../components/shared/FlexibleSelectButton";
import { loanModeSelectTypes } from "../admin/loans";

interface currentLoansProps {
  user: ModifiedUserData;
}

const currentLoans: React.FC<currentLoansProps> = ({ user }) => {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);
  const [loanType, setLoanType] = useState<
    "processing" | "ongoing" | "finished" | "all"
  >("ongoing");
  const { data, isValidating } = useSWR(
    mounted ? `/user/loans/${loanType}` : "null"
  );
  if (data && !isProduction) console.log("data: ", data);
  return (
    <DashboardLayout data={user}>
      <div className="flex justify-between">
        <DashboardTitle title="Current Loans" />
        <FlexibleSelectButton
          selectValue={loanType}
          setSelectValue={setLoanType}
          selectArray={loanModeSelectTypes}
          isValidating={isValidating}
        />
        {user.role === "borrower" && (
          <button
            onClick={() => router.push("/loans/new-loan")}
            className="bg-primary text-white p-3 w-1/3 rounded-full tracking-wide
                  font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-primaryAccent
                  shadow-lg transition-css"
          >
            New Loan
          </button>
        )}
      </div>
      <div className="mt-5">
        {data ? (
          <ReadyMadeTable
            title={`${loanType} Loans`}
            data={data.loans}
            isValidating={isValidating}
            header={LoanTableHeader}
            pagination
            emptyMessage="No Loans Found"
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
