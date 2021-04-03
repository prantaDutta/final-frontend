import { withIronSession } from "next-iron-session";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Account from "../../components/settings/Account";
import Personal from "../../components/settings/Personal";
import Security from "../../components/settings/Security";
import DashboardTitle from "../../components/shared/DashboardTitle";
import FullWidthReactLoader from "../../components/shared/FullWidthReactLoader";
import { NEXT_IRON_SESSION_CONFIG } from "../../utils/constants";
import { redirectToPage } from "../../utils/functions";
import { ModifiedUserData } from "../../utils/randomTypes";

interface SettingsProps {
  user: ModifiedUserData;
}

const Settings: React.FC<SettingsProps> = ({ user }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);
  const { data, mutate } = useSWR(mounted ? `/user/` : null);
  return (
    <DashboardLayout data={user}>
      <DashboardTitle backButton={false} title="Settings" />
      {data ? (
        <>
          <Personal data={data} mutate={mutate} />
          <Account data={data} mutate={mutate} />
          <Security data={data} mutate={mutate} />
        </>
      ) : (
        <FullWidthReactLoader />
      )}
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

export default Settings;
