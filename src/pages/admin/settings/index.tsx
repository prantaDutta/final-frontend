import React, { useEffect, useState } from "react";
import useSWR from "swr";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import Account from "../../../components/settings/Account";
import Administration from "../../../components/settings/Administration";
import Personal from "../../../components/settings/Personal";
import Security from "../../../components/settings/Security";
import DashboardTitle from "../../../components/shared/DashboardTitle";
import FullWidthReactLoader from "../../../components/shared/FullWidthReactLoader";
import { ModifiedUserData } from "../../../utils/randomTypes";
import withAdminAuth from "../../../utils/withAdminAuth";
import FetchError from "../../../components/shared/FetchError";

interface dashboardProps {
  user: ModifiedUserData;
}

const Settings: React.FC<dashboardProps> = ({ user }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);
  const { data, mutate, error } = useSWR(mounted ? `/admin/` : null);
  if (error) {
    return <FetchError user={user}/>
  }
  return (
    <DashboardLayout data={user} title={`Settings`}>
      <DashboardTitle backButton={false} title="Settings" />
      {data ? (
        <>
          <Personal mutate={mutate} data={data} />
          <Account mutate={mutate} data={data} />
          <Security mutate={mutate} data={data} />
          <Administration />
        </>
      ) : (
        <FullWidthReactLoader />
      )}
    </DashboardLayout>
  );
};

export const getServerSideProps = withAdminAuth(async (context) => {
  const { user } = context;
  return { props: { user } };
});

export default Settings;
