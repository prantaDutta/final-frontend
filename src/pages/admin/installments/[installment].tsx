import { withIronSession } from "next-iron-session";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DashboardTitle from "../../../components/shared/DashboardTitle";
import FullWidthReactLoader from "../../../components/shared/FullWidthReactLoader";
import ShowInstallmentDetails from "../../../components/shared/ShowInstallmentDetails";
import { NEXT_IRON_SESSION_CONFIG } from "../../../utils/constants";
import { objectToArray, redirectToPage } from "../../../utils/functions";
import { ModifiedUserData } from "../../../utils/randomTypes";
import ErrorPage from "../../404";

interface InstallmentProps {
  user: ModifiedUserData;
  installmentId: string;
}

const Installment: React.FC<InstallmentProps> = ({ user, installmentId }) => {
  if (!installmentId) return <ErrorPage />;

  const [mounted, useMounted] = useState<boolean>(false);
  useEffect(() => useMounted(true), []);
  let { data } = useSWR(
    mounted ? `/user/get-single-installment/${installmentId}` : null
  );

  return (
    <DashboardLayout data={user}>
      <div className="flex justify-between">
        <DashboardTitle title={`Installment Details`} />
      </div>
      {data ? (
        <ShowInstallmentDetails dataArray={objectToArray(data.installment)} />
      ) : (
        <FullWidthReactLoader />
      )}
    </DashboardLayout>
  );
};

export const getServerSideProps = withIronSession(
  async ({ req, res, query }) => {
    const user = req.session.get("user");
    if (!user) {
      await redirectToPage(req, res, "/login");
      return { props: {} };
    }

    const installmentId: string = query.installment;

    return {
      props: { user, installmentId },
    };
  },
  NEXT_IRON_SESSION_CONFIG
);

export default Installment;
