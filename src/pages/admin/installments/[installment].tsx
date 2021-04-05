import React, { useEffect, useState } from "react";
import useSWR from "swr";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DashboardTitle from "../../../components/shared/DashboardTitle";
import FullWidthReactLoader from "../../../components/shared/FullWidthReactLoader";
import ShowInstallmentDetails from "../../../components/shared/ShowInstallmentDetails";
import { objectToArray } from "../../../utils/functions";
import { ModifiedUserData } from "../../../utils/randomTypes";
import withAdminAuth from "../../../utils/withAdminAuth";
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

export const getServerSideProps = withAdminAuth(async (context) => {
  const { user, query } = context;
  const installmentId: string = query.installment;

  return {
    props: { user, installmentId },
  };
});

export default Installment;
