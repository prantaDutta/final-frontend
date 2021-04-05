import React from "react";
import AdminDashboardContent from "../../../components/dashboard/AdminDashboardContent";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { ModifiedUserData } from "../../../utils/randomTypes";
import withAdminAuth from "../../../utils/withAdminAuth";

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

export const getServerSideProps = withAdminAuth(async (context) => {
  const { user } = context;
  return { props: { user } };
});

export default dashboard;
