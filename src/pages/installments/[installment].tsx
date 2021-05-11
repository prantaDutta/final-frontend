import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import DashboardTitle from "../../components/shared/DashboardTitle";
import FetchError from "../../components/shared/FetchError";
import FullWidthReactLoader from "../../components/shared/FullWidthReactLoader";
import ReactLoader from "../../components/shared/ReactLoader";
import ShowDetailsInATableWithLinks from "../../components/shared/ShowDetailsInATableWithLinks";
import { laravelApi } from "../../utils/api";
import { objectToArrayAndExclude } from "../../utils/functions";
import { ModifiedUserData } from "../../utils/randomTypes";
import { notify } from "../../utils/toasts";
import withAuth from "../../utils/withAuth";
import ErrorPage from "../404";

interface InstallmentProps {
  user: ModifiedUserData;
  installmentId: string;
}

const Installment: React.FC<InstallmentProps> = ({ user, installmentId }) => {
  if (!installmentId) return <ErrorPage />;

  const router = useRouter();

  const [mounted, useMounted] = useState<boolean>(false);
  useEffect(() => useMounted(true), []);
  const { data, error } = useSWR(
    `/user/get-single-installment/${installmentId}`
  );

  if (mounted && error) {
    setTimeout(() => {
      return <FetchError user={user} />;
    }, 5000);
  }
  const [submitting, setSubmitting] = useState<boolean>(false);

  return (
    <DashboardLayout data={user} title={`Installment Details`}>
      <div className="flex justify-between">
        <DashboardTitle title={`Installment Details`} />
        {data &&
          data.installment.status !== "paid" &&
          user.role === "borrower" && (
            <div>
              {submitting ? (
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
                          amount: data?.installment.totalAmount,
                          id: data?.installment.id,
                        }
                      );
                      console.log("Successfully Paid", SomeData);
                      notify("Paid Successfully", {
                        type: "success",
                      });
                      return router.push("/installments");
                    } catch (e) {
                      console.log(e);
                      notify(
                        e?.response?.data?.error || "Something Went Wrong",
                        {
                          type: "error",
                        }
                      );
                    }
                    setSubmitting(false);
                  }}
                  className="edit-btn"
                >
                  Pay Now
                </button>
              )}
            </div>
          )}
      </div>
      {data ? (
        <>
          <ShowDetailsInATableWithLinks
            title="Installment Data"
            dataArray={objectToArrayAndExclude(data.installment, ["id"])}
          />
          <ShowDetailsInATableWithLinks
            title="Loan Data"
            dataArray={objectToArrayAndExclude(data.loan, ["id"])}
            urlArray={[`/loans/${data.loan.id}`]}
          />
        </>
      ) : (
        <FullWidthReactLoader />
      )}
    </DashboardLayout>
  );
};

export const getServerSideProps = withAuth(async (context) => {
  const { user, query } = context;
  const installmentId: string = query.installment;
  return { props: { user, installmentId } };
});

export default Installment;
