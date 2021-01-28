import { ThreeDots } from "@agney/react-loading";
import { NextPageContext } from "next";
import { withIronSession } from "next-iron-session";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import ReactLoader from "../../../components/shared/ReactLoader";
import { NEXT_IRON_SESSION_CONFIG } from "../../../utils/constants";
import { redirectToLogin } from "../../../utils/functions";
import { ModifiedUserData } from "../../../utils/randomTypes";
import ReadyMadeTable from "../../../components/ReactTable/ReadyMadeTable";
import FullWidthReactLoader from "../../../components/shared/FullWidthReactLoader";
import DashboardTitle from "../../../components/shared/DashboardTitle";

interface VerificationRequestsProps {
  user: ModifiedUserData;
}

enum RequestTypeEnum {
  all = "all",
  processing = "processing",
  ongoing = "ongoing",
  finished = "finished",
}

const LoanRequests: React.FC<VerificationRequestsProps> = ({ user }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  // const [submitting, setSubmitting] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);
  const [requestType, setRequestType] = useState<RequestTypeEnum>(
    RequestTypeEnum.all
  );
  // const { data, isValidating } = useSWR(BASE_URL + "/api/admin/loan-requests");
  const { data, isValidating } = useSWR(
    mounted ? `/admin/loan-requests/${requestType}` : null
  );
  return (
    <DashboardLayout data={user}>
      <div className="flex justify-between">
        <DashboardTitle title="Loan Requests" />
        <button
          className="bg-primary p-3 w-1/3 rounded-full tracking-wide
                  font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-primaryAccent
                  shadow-lg transition-css"
        >
          {isValidating ? (
            <ReactLoader component={<ThreeDots width="50" />} />
          ) : (
            <select
              value={requestType}
              onChange={(e) => setRequestType(e.target.value as any)}
            >
              <option value={RequestTypeEnum.all}>All</option>
              <option value={RequestTypeEnum.processing}>Processing</option>
              <option value={RequestTypeEnum.ongoing}>Ongoing</option>
              <option value={RequestTypeEnum.finished}>Finished</option>
            </select>
          )}
        </button>
      </div>

      {data ? (
        <ReadyMadeTable
          title="All Loan Requests"
          data={data.loans}
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
      redirectToLogin(context.req, context.res);
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
