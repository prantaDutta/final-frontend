import { NextPageContext } from "next";
import { withIronSession } from "next-iron-session";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { NEXT_IRON_SESSION_CONFIG } from "../../../utils/constants";
import { redirectToLogin } from "../../../utils/functions";
import {
  ModifiedUserData,
  SelectOptionsTypes,
} from "../../../utils/randomTypes";
import ReadyMadeTable from "../../../components/ReactTable/ReadyMadeTable";
import FullWidthReactLoader from "../../../components/shared/FullWidthReactLoader";
import DashboardTitle from "../../../components/shared/DashboardTitle";
import FlexibleSelectButton from "../../../components/shared/FlexibleSelectButton";

interface VerificationRequestsProps {
  user: ModifiedUserData;
}

const LoanRequests: React.FC<VerificationRequestsProps> = ({ user }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);
  const [requestType, setRequestType] = useState<
    "processing" | "ongoing" | "finished" | "all"
  >("processing");
  const { data, isValidating } = useSWR(
    mounted ? `/admin/loans/${requestType}` : null
  );
  return (
    <DashboardLayout data={user}>
      <div className="flex justify-between">
        <DashboardTitle title="Loan Requests" />
        <FlexibleSelectButton
          selectValue={requestType}
          setSelectValue={setRequestType}
          selectArray={loanModeSelectTypes}
          isValidating={isValidating}
        />
      </div>

      {data ? (
        <ReadyMadeTable
          title="All Loan Requests"
          data={data.loans}
          pagination
          isValidating={isValidating}
          header={loanRequestsTableHeader}
          emptyMessage="No New Loan Requests"
        />
      ) : (
        <FullWidthReactLoader />
      )}
    </DashboardLayout>
  );
};

export const getServerSideProps = withIronSession(
  async (context: NextPageContext) => {
    const user = (context.req as any).session.get("user");
    if (!user) {
      await redirectToLogin(context.req, context.res);
      return { props: {} };
    }

    return {
      props: { user },
    };
  },
  NEXT_IRON_SESSION_CONFIG
);

export default LoanRequests;

export const loanRequestsTableHeader = [
  // {
  //   Header: "Name",
  //   accessor: (row: any) => {
  //     let usersName = "";
  //     const len = row.users.length;
  //     row.users.forEach((user: any, i: number) => {
  //       usersName += user.name;
  //       console.log(len);
  //       console.log(i);
  //       if (i !== len - 1) {
  //         usersName += ", ";
  //       }
  //     });
  //     return usersName;
  //   },
  // },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Monthly Installment",
    accessor: "monthlyInstallment",
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
    Header: "Modified Monthly Installment",
    accessor: "modifiedMonthlyInstallment",
  },
  {
    Header: "Loan Mode",
    accessor: "loanMode",
  },
];

export const loanModeSelectTypes: SelectOptionsTypes[] = [
  {
    title: "Processing",
    value: "processing",
  },
  {
    title: "Ongoing",
    value: "ongoing",
  },
  {
    title: "Finished",
    value: "finished",
  },
  {
    title: "all",
    value: "all",
  },
];
