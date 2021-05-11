import Link from "next/link";
import React, { useState } from "react";
import { Cell, Column } from "react-table";
import useSWR from "swr";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import ReadyMadeTable from "../../../components/ReactTable/ReadyMadeTable";
import DashboardTitle from "../../../components/shared/DashboardTitle";
import FetchError from "../../../components/shared/FetchError";
import FlexibleSelectButton from "../../../components/shared/FlexibleSelectButton";
import FullWidthReactLoader from "../../../components/shared/FullWidthReactLoader";
import {
  ModifiedUserData,
  SelectOptionsTypes,
} from "../../../utils/randomTypes";
import withAdminAuth from "../../../utils/withAdminAuth";

interface VerificationRequestsProps {
  user: ModifiedUserData;
}

const VerificationRequests: React.FC<VerificationRequestsProps> = ({
  user,
}) => {
  const [verified, setVerified] =
    useState<"pending" | "verified" | "unverified" | "all">("pending");
  const { data, mutate, error } = useSWR(`/admin/users/${verified}`);
  if (error) {
    return <FetchError user={user} />;
  }
  return (
    <DashboardLayout data={user} title={`Users`}>
      <div className="flex justify-between">
        <DashboardTitle backButton={false} title="Users" />
        <FlexibleSelectButton
          selectValue={verified}
          setSelectValue={setVerified}
          selectArray={selectUserTypes}
          isValidating={!data}
        />
      </div>
      {data ? (
        <ReadyMadeTable
          title={`${verified} Users`}
          data={data.users}
          isValidating={!data}
          pagination
          header={verificationRequestsTableHeader}
          emptyMessage="You Don't have new Verification Requests"
          mutateData={() => mutate()}
        />
      ) : (
        <FullWidthReactLoader />
      )}
    </DashboardLayout>
  );
};

export const getServerSideProps = withAdminAuth(async (context) => {
  const { user } = context;
  return { props: { user } };
});

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
        <span className="check">Check</span>
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
