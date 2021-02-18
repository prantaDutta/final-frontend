import { withIronSession } from "next-iron-session";
import React from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { NEXT_IRON_SESSION_CONFIG } from "../../../utils/constants";
import { redirectToPage } from "../../../utils/functions";
import { ModifiedUserData } from "../../../utils/randomTypes";
import AdminDashboardContent from "../../../components/dashboard/AdminDashboardContent";

interface dashboardProps {
  user: ModifiedUserData;
}

const dashboard: React.FC<dashboardProps> = ({ user }) => {
  return (
    <DashboardLayout data={user}>
      <AdminDashboardContent />
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

export default dashboard;
