import { Grid } from "@agney/react-loading";
import { NextPageContext } from "next";
import { withIronSession } from "next-iron-session";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { isProduction, NEXT_IRON_SESSION_CONFIG } from "../../utils/constants";
import { redirectToLogin } from "../../utils/functions";
import { ModifiedUserData } from "../../utils/randomTypes";
import { NewLoanFormValues } from "./new-loan";
import { laravelApi } from "../../utils/api";
import FullWidthReactLoader from "../../components/shared/FullWidthReactLoader";

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
        <div>
          {isValidating && !data ? (
            <FullWidthReactLoader component={<Grid width="50" />} />
          ) : data && data.length > 0 ? (
            data.map((loanData: any) => {
              const {
                amount,
                interestRate,
                loanDuration,
                monthlyInstallment,
              }: NewLoanFormValues = loanData;
              return (
                <table
                  key={loanData.id}
                  className="w-full shadow-lg bg-white text-center"
                >
                  <thead>
                    <tr>
                      {CurrentLoanTableHeader.map((header: string) => (
                        <th
                          key={header}
                          className="bg-primary font-semibold border px-8 py-4 text-white"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    <tr key={loanData.id}>
                      <td className="font-semibold border px-8 py-4">
                        {amount}
                      </td>
                      <td className="font-semibold border px-8 py-4">
                        {interestRate}
                      </td>
                      <td className="font-semibold border px-8 py-4">
                        {loanDuration}
                      </td>
                      <td className="font-semibold border px-8 py-4">
                        {monthlyInstallment}
                      </td>
                      <td className="font-semibold border px-8 py-4">
                        {loanData.loanMode}
                      </td>
                      <td className="font-semibold border px-8 py-4">N/A</td>
                    </tr>
                  </tbody>
                </table>
              );
            })
          ) : (
            <p className="font-semibold font-xl">
              You Don't Have Any Current Loans.
            </p>
          )}
        </div>
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

export const CurrentLoanTableHeader = [
  "Loan Amount",
  "Loan Interest",
  "Loan Duration",
  "Monthly Installment",
  "Loan Mode",
  "Loan Period",
];
