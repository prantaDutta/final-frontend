import { NextPageContext } from "next";
import { withIronSession } from "next-iron-session";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { NEXT_IRON_SESSION_CONFIG } from "../../../utils/constants";
import { redirectToLogin } from "../../../utils/functions";
import { ModifiedUserData } from "../../../utils/randomTypes";
import DashboardTitle from "../../../components/shared/DashboardTitle";
import useSWR from "swr";
import Personal from "../../../components/settings/Personal";
import Account from "../../../components/settings/Account";
import Security from "../../../components/settings/Security";
import FullWidthReactLoader from "../../../components/shared/FullWidthReactLoader";

interface dashboardProps {
  user: ModifiedUserData;
}

const Settings: React.FC<dashboardProps> = ({ user }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);
  const { data, isValidating } = useSWR(mounted ? `/admin/` : null);
  return (
    <DashboardLayout data={user}>
      <DashboardTitle title="Settings" />
      {!isValidating ? (
        <>
          <Personal data={data} />
          <Account data={data} />
          <Security data={data} />
        </>
      ) : (
        <FullWidthReactLoader />
      )}
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
