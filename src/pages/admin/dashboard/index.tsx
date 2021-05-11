import { applySession } from "next-iron-session";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import useSWR from "swr";
import AdminDashboardContent from "../../../components/dashboard/AdminDashboardContent";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import FetchError from "../../../components/shared/FetchError";
import { shouldNotify } from "../../../states/userStates";
import { NEXT_IRON_SESSION_CONFIG } from "../../../utils/constants";
import { ModifiedUserData } from "../../../utils/randomTypes";
import withAdminAuth from "../../../utils/withAdminAuth";

interface dashboardProps {
  user: ModifiedUserData;
  alert: boolean;
}

const dashboard: React.FC<dashboardProps> = ({ user, alert }) => {
  const { data, error } = useSWR(`/admin/dashboard-data`);
  if (error) {
    return <FetchError user={user} />;
  }
  const [, setShouldNotify] = useRecoilState(shouldNotify);
  useEffect(() => setShouldNotify(alert), []);
  return (
    <DashboardLayout data={user} title={`Admin Dashboard`}>
      <AdminDashboardContent data={data} />
    </DashboardLayout>
  );
};

export const getServerSideProps = withAdminAuth(async (context) => {
  const { user } = context;
  let alert = false;

  await applySession(context.req, context.res, NEXT_IRON_SESSION_CONFIG);
  const shouldNotify = context.req.session.get("shouldNotifyAdmin");

  if (!shouldNotify) {
    alert = true;
    context.req.session.set("shouldNotifyAdmin", true);
  }

  await context.req.session.save();
  return { props: { user, alert } };
});

export default dashboard;
