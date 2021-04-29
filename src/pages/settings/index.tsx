import React, { useEffect, useState } from "react";
import useSWR from "swr";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Account from "../../components/settings/Account";
import Personal from "../../components/settings/Personal";
import Security from "../../components/settings/Security";
import DashboardTitle from "../../components/shared/DashboardTitle";
import FullWidthReactLoader from "../../components/shared/FullWidthReactLoader";
import { ModifiedUserData } from "../../utils/randomTypes";
import withAuth from "../../utils/withAuth";
import LoanPreference from "../../components/settings/LoanPreference";
import FetchError from "../../components/shared/FetchError";

interface SettingsProps {
  user: ModifiedUserData;
}

const Settings: React.FC<SettingsProps> = ({ user }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);
  const { data, mutate, error } = useSWR(mounted ? `/user/` : null);
  if (error) {
    return <FetchError user={user}/>
  }
  return (
    <DashboardLayout data={user} title={`Settings`}>
      <DashboardTitle backButton={false} title="Settings" />
      {data ? (
        <>
          <Personal data={data} mutate={mutate} />
          <Account data={data} mutate={mutate} />
          <Security data={data} mutate={mutate} />
          {user.role === 'lender' && (
              <LoanPreference />
          )}
        </>
      ) : (
        <FullWidthReactLoader />
      )}
    </DashboardLayout>
  );
};

export const getServerSideProps = withAuth(async (context) => {
  const { user } = context;
  return { props: { user } };
});

export default Settings;
