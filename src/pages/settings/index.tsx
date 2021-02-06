import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { withIronSession } from "next-iron-session";
import { NextPageContext } from "next";
import { redirectToLogin } from "../../utils/functions";
import { NEXT_IRON_SESSION_CONFIG } from "../../utils/constants";
import { ModifiedUserData } from "../../utils/randomTypes";
import DashboardTitle from "../../components/shared/DashboardTitle";

interface SettingsProps {
  user: ModifiedUserData;
}

const Settings: React.FC<SettingsProps> = ({ user }) => {
  return (
    <DashboardLayout data={user}>
      <DashboardTitle title="Settings" />
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
