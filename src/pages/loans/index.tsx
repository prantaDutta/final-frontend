import { withIronSession } from "next-iron-session";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Column } from "react-table";
import useSWR from "swr";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ReadyMadeTable from "../../components/ReactTable/ReadyMadeTable";
import DashboardTitle from "../../components/shared/DashboardTitle";
import FlexibleSelectButton from "../../components/shared/FlexibleSelectButton";
import FullWidthReactLoader from "../../components/shared/FullWidthReactLoader";
import { logout } from "../../utils/auth";
import { NEXT_IRON_SESSION_CONFIG } from "../../utils/constants";
import { ModifiedUserData } from "../../utils/randomTypes";
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
  >("all");
  const { data, mutate } = useSWR(mounted ? `/user/loans/${loanType}` : "null");
  // if (data && !isProduction) console.log("data: ", data);
  return (
    <DashboardLayout data={user}>
      <div className="flex justify-between">
        <DashboardTitle backButton={false} title="Current Loans" />
        <FlexibleSelectButton
          selectValue={loanType}
          setSelectValue={setLoanType}
          selectArray={loanModeSelectTypes}
          isValidating={!data}
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
            isValidating={!data}
            header={LoanTableHeader}
            pagination
            emptyMessage="No Loans Found"
            mutateData={() => mutate()}
          />
        ) : (
          <FullWidthReactLoader />
        )}
      </div>
    </DashboardLayout>
  );
};

export const getServerSideProps = withIronSession(async ({ req, res }) => {
  const user = req.session.get("user");
  if (!user) {
    // await redirectToPage(req, res, "/login");
    // return { props: {} };
    await logout();
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  return {
    props: { user },
  };
}, NEXT_IRON_SESSION_CONFIG);

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
