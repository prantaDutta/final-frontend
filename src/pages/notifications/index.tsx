import { ModifiedUserData } from "../../utils/randomTypes";
import { withIronSession } from "next-iron-session";
import { formatDate, redirectToPage } from "../../utils/functions";
import { isProduction, NEXT_IRON_SESSION_CONFIG } from "../../utils/constants";
import DashboardTitle from "../../components/shared/DashboardTitle";
import ReadyMadeTable from "../../components/ReactTable/ReadyMadeTable";
import FullWidthReactLoader from "../../components/shared/FullWidthReactLoader";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import React, { useEffect, useState } from "react";
import useSWR, { trigger } from "swr";
import { Cell, Column } from "react-table";
import { laravelApi } from "../../utils/api";

interface NotificationsProps {
  user: ModifiedUserData;
}

const Notifications: React.FC<NotificationsProps> = ({ user }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);
  const { data, isValidating } = useSWR(
    mounted ? `/user/get-all-notifications` : null
  );
  if (data && !isProduction) console.log("data: ", data);
  return (
    <DashboardLayout data={user}>
      <DashboardTitle title="Notifications" />

      {data ? (
        <ReadyMadeTable
          title="Latest Notifications"
          data={data.notifications}
          isValidating={isValidating}
          header={NotificationsTableHeader}
          pagination
          emptyMessage="You don't have any Notifications"
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

export default Notifications;

export const NotificationsTableHeader: Column[] = [
  {
    Header: "Notification",
    accessor: "data.msg",
  },
  {
    Header: "Created At",
    accessor: "updatedAt",
    Cell: ({ value }: Cell) => formatDate(value, "MMM D, YYYY h:mm A"),
  },
  {
    Header: "Action",
    accessor: "id",
    Cell: ({ value }: Cell) => (
      <svg
        onClick={async () => {
          await laravelApi().post(`/user/notification/${value}`);
          await trigger("/user/get-all-notifications");
        }}
        className="w-6 h-6 inline mt-0.5 text-red-600 cursor-pointer"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    ),
  },
];
