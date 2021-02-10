import { NextPageContext } from "next";
import { withIronSession } from "next-iron-session";
import React from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { NEXT_IRON_SESSION_CONFIG } from "../../../utils/constants";
import { redirectToLogin } from "../../../utils/functions";
import { ModifiedUserData } from "../../../utils/randomTypes";
import DashboardTitle from "../../../components/shared/DashboardTitle";

interface dashboardProps {
  user: ModifiedUserData;
}

const Settings: React.FC<dashboardProps> = ({ user }) => {
  return (
    <DashboardLayout data={user}>
      <DashboardTitle title="Settings" />
      <p>I still don't know what to write here</p>
    </DashboardLayout>
  );
};

export const getServerSideProps = withIronSession(
  async (context: NextPageContext) => {
    const user = (context.req as any).session.get("user");
    if (!user || user?.role !== "admin") {
      await redirectToLogin(context?.req, context?.res);
      return { props: {} };
    }

    return {
      props: { user },
    };
  },
  NEXT_IRON_SESSION_CONFIG
);

export default Settings;
