import { ThreeDots } from "@agney/react-loading";
import { NextPageContext } from "next";
import { withIronSession } from "next-iron-session";
import React, { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import ReactLoader from "../../../components/shared/ReactLoader";
import Table from "../../../components/ReactTable/Table";
import { NEXT_IRON_SESSION_CONFIG } from "../../../utils/constants";
import { redirectToLogin } from "../../../utils/functions";
import { ModifiedUserData } from "../../../utils/randomTypes";

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
  const columns = useMemo(() => loanRequestsTableHeader, [data]);
  const tableData = useMemo(() => data, [data]);
  return (
    <DashboardLayout data={user}>
      <div className="p-4 flex justify-between">
        <h1 className="text-3xl">Loan Requests</h1>
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
      {!isValidating ? (
        data && data.loans.length > 0 ? (
          <Table
            data={tableData.loans}
            columns={columns}
            tableClass="w-full shadow-lg bg-white text-center"
            thClass="bg-primary font-semibold border px-8 py-4"
            tdClass="font-semibold border px-8 py-4"
            pagination={true}
          />
        ) : (
          <p>No New Loan Requests</p>
        )
      ) : null}
      {isValidating && (
        <button
          className="bg-transparent text-primary p-3 w-full tracking-wide
                  font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-primaryAccent
                  shadow-lg transition-css"
        >
          <ReactLoader component={<ThreeDots width="50" />} />
        </button>
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
