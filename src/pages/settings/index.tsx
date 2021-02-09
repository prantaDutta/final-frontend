import { NextPageContext } from "next";
import { withIronSession } from "next-iron-session";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Personal from "../../components/settings/Personal";
import DashboardTitle from "../../components/shared/DashboardTitle";
import { NEXT_IRON_SESSION_CONFIG } from "../../utils/constants";
import { redirectToLogin } from "../../utils/functions";
import { ModifiedUserData } from "../../utils/randomTypes";
import useSWR from "swr";
import Account from "../../components/settings/Account";
import Security from "../../components/settings/Security";
import FullWidthReactLoader from "../../components/shared/FullWidthReactLoader";

interface SettingsProps {
  user: ModifiedUserData;
}

const Settings: React.FC<SettingsProps> = ({ user }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);
  const { data, isValidating } = useSWR(mounted ? `/user/` : null);
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
    if (!user) {
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
