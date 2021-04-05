import React from "react";
import UserDashboardContent from "../../components/dashboard/UserDashboardContent";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { ModifiedUserData } from "../../utils/randomTypes";
import withAuth from "../../utils/withAuth";

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

export const getServerSideProps = withAuth(async (context) => {
  const { user } = context;
  return { props: { user } };
});

export default dashboard;
