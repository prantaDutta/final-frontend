import { withIronSession } from "next-iron-session";
import React from "react";
import UserDashboardContent from "../../components/dashboard/UserDashboardContent";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { logout } from "../../utils/auth";
import { NEXT_IRON_SESSION_CONFIG } from "../../utils/constants";
import { ModifiedUserData } from "../../utils/randomTypes";

interface dashboardProps {
  user: ModifiedUserData;
}

const dashboard: React.FC<dashboardProps> = ({ user }) => {
  return (
    <DashboardLayout data={user}>
      <UserDashboardContent />
    </DashboardLayout>
  );
};

export const getServerSideProps = withIronSession(async ({ req, res }) => {
  const user = req.session.get("user");
  if (!user) {
    // await redirectToPage(req, res, "/login");
    // return { props: {} };
    await logout();
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  return {
    props: { user },
  };
}, NEXT_IRON_SESSION_CONFIG);

export default dashboard;
