import { withIronSession } from "next-iron-session";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Cell, Column } from "react-table";
import useSWR from "swr";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ReadyMadeTable from "../../components/ReactTable/ReadyMadeTable";
import DashboardTitle from "../../components/shared/DashboardTitle";
import FlexibleSelectButton from "../../components/shared/FlexibleSelectButton";
import FullWidthReactLoader from "../../components/shared/FullWidthReactLoader";
import { NEXT_IRON_SESSION_CONFIG } from "../../utils/constants";
import { formatDate, redirectToPage } from "../../utils/functions";
import { ModifiedUserData } from "../../utils/randomTypes";
import { installmentStatusSelectTypes } from "../admin/loans";

interface indexProps {
  user: ModifiedUserData;
}

const index: React.FC<indexProps> = ({ user }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);
  const [installmentStatus, setinstallmentStatus] = useState<
    "due" | "unpaid" | "paid" | "all"
  >("all");
  const { data, mutate } = useSWR(
    mounted ? `/user/get-all-installments/${installmentStatus}` : "null"
  );
  return (
    <DashboardLayout data={user}>
      <div className="flex justify-between">
        <DashboardTitle backButton={false} title="Current Installments" />
        <FlexibleSelectButton
          selectValue={installmentStatus}
          setSelectValue={setinstallmentStatus}
          selectArray={installmentStatusSelectTypes}
          isValidating={!data}
        />
      </div>
      <div className="mt-5">
        {data ? (
          <ReadyMadeTable
            title={`${installmentStatus} Installments`}
            data={data.installments}
            isValidating={!data}
            header={InstallmentTableHeader}
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
    await redirectToPage(req, res, "/login");
    return { props: {} };
  }

  return {
    props: { user },
  };
}, NEXT_IRON_SESSION_CONFIG);

export default index;

export const InstallmentTableHeader: Column[] = [
  // {
  //   Header: "Installment Id",
  //   accessor: "uniqueInstallmentId",
  // },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Penalty Amount",
    accessor: "penaltyAmount",
  },
  {
    Header: "Total Amount",
    accessor: "totalAmount",
  },
  {
    Header: "Due Date",
    accessor: "dueDate",
    Cell: ({ value }: Cell) => formatDate(value, "MMM D, YYYY"),
  },
  {
    Header: "Action",
    accessor: "id",
    Cell: ({ value }: Cell) => (
      <Link href={`/installments/${value}`}>
        <span className="btn bg-primary text-white px-3 py-2">Check</span>
      </Link>
    ),
  },
];
