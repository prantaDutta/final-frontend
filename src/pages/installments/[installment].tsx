import { withIronSession } from "next-iron-session";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import DashboardTitle from "../../components/shared/DashboardTitle";
import FullWidthReactLoader from "../../components/shared/FullWidthReactLoader";
import ReactLoader from "../../components/shared/ReactLoader";
import ShowInstallmentDetails from "../../components/shared/ShowInstallmentDetails";
import { laravelApi } from "../../utils/api";
import { NEXT_IRON_SESSION_CONFIG } from "../../utils/constants";
import { objectToArray, redirectToPage } from "../../utils/functions";
import { ModifiedUserData } from "../../utils/randomTypes";
import { notify } from "../../utils/toasts";
import ErrorPage from "../404";

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

  const [submitting, setSubmitting] = useState<boolean>(false);

  return (
    <DashboardLayout data={user}>
      <div className="flex justify-between">
        <DashboardTitle title={`Installment Details`} />
        {data && data.installment.status !== "paid" && submitting ? (
          <button className="edit-btn">
            <ReactLoader />
          </button>
        ) : (
          <button
            onClick={async () => {
              setSubmitting(true);
              try {
                const { data: SomeData } = await laravelApi().post(
                  "/user/pay-installment",
                  {
                    amount: data?.installment.amount,
                    id: data?.installment.id,
                  }
                );
                console.log("Succefully Paid", SomeData);
                notify("Paid Successfully", {
                  type: "success",
                });
              } catch (e) {
                console.log(e);
                notify("Please Deposit First.", {
                  type: "error",
                });
              }
              setSubmitting(false);
            }}
            className="edit-btn"
          >
            Pay Now
          </button>
        )}
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
