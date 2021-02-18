import { withIronSession } from "next-iron-session";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Cell, Column } from "react-table";
import useSWR from "swr";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { NEXT_IRON_SESSION_CONFIG } from "../../../utils/constants";
import { redirectToPage } from "../../../utils/functions";
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

const VerificationRequests: React.FC<VerificationRequestsProps> = ({
  user,
}) => {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);
  const [verified, setVerified] = useState<
    "pending" | "verified" | "unverified" | "all"
  >("pending");
  const { data, isValidating } = useSWR(
    mounted ? `/admin/users/${verified}` : null
  );
  return (
    <DashboardLayout data={user}>
      <div className="flex justify-between">
        <DashboardTitle title="Users" />
        <FlexibleSelectButton
          selectValue={verified}
          setSelectValue={setVerified}
          selectArray={selectUserTypes}
          isValidating={isValidating}
        />
      </div>
      {data ? (
        <ReadyMadeTable
          title={`${verified} Users`}
          data={data.users}
          isValidating={isValidating}
          pagination
          header={verificationRequestsTableHeader}
          emptyMessage="You Don't have new Verification Requests"
        />
      ) : (
        <FullWidthReactLoader />
      )}
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

export default VerificationRequests;

export const verificationRequestsTableHeader: Column[] = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Verified",
    accessor: "verified",
  },
  {
    Header: "Action",
    accessor: "id",
    Cell: ({ value }: Cell) => (
      <Link href={`/admin/users/${value}`}>
        <span className="btn bg-primary text-white px-3 py-2">Check</span>
      </Link>
    ),
  },
];

export const selectUserTypes: SelectOptionsTypes[] = [
  {
    title: "All",
    value: "all",
  },
  {
    title: "Pending",
    value: "pending",
  },
  {
    title: "Verified",
    value: "verified",
  },
  {
    title: "Unverified",
    value: "unverified",
  },
];
