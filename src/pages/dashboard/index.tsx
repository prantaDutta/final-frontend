import { applySession } from "next-iron-session";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import useSWR from "swr";
import UserDashboardContent from "../../components/dashboard/UserDashboardContent";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import FetchError from "../../components/shared/FetchError";
import { shouldNotify } from "../../states/userStates";
import { NEXT_IRON_SESSION_CONFIG } from "../../utils/constants";
import { ModifiedUserData } from "../../utils/randomTypes";
import withAuth from "../../utils/withAuth";

interface dashboardProps {
  user: ModifiedUserData;
  alert: boolean;
}

const dashboard: React.FC<dashboardProps> = ({ user, alert }) => {
  const [, setShouldNotify] = useRecoilState(shouldNotify);
  useEffect(() => {
    setShouldNotify(alert);
  }, []);
  const { data, error } = useSWR(`/user/dashboard-data`);
  if (error) {
    return <FetchError user={user} />;
  }
  return (
    <DashboardLayout data={user} title={`User Dashboard`}>
      <UserDashboardContent data={data} />
    </DashboardLayout>
  );
};

export const getServerSideProps = withAuth(async (context) => {
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
