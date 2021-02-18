import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { withIronSession } from "next-iron-session";
import { formatDate, redirectToPage } from "../../../utils/functions";
import {
  isProduction,
  NEXT_IRON_SESSION_CONFIG,
} from "../../../utils/constants";
import { ModifiedUserData } from "../../../utils/randomTypes";
import React, { useEffect, useState } from "react";
import ErrorPage from "../../404";
import useSWR from "swr";
import MarkAsButton from "../../../components/shared/MarkAsButton";
import { verificationRequestTableHeader } from "../../../utils/constantsArray";
import FullWidthReactLoader from "../../../components/shared/FullWidthReactLoader";

interface WithdrawalRequestProps {
  user: ModifiedUserData;
  request: string;
}

const WithdrawalRequests: React.FC<WithdrawalRequestProps> = ({
  user,
  request,
}) => {
  if (!request) return <ErrorPage />;
  const [mounted, useMounted] = useState<boolean>(false);
  useEffect(() => useMounted(true), []);
  const { data } = useSWR(mounted ? `/admin/transaction/${request}` : null);
  if (!isProduction) console.log("data: ", data);
  if (data) {
    delete data.transaction.id;
    delete data.transaction.email;
    delete data.transaction.currency;
    delete data.transaction.status;
    delete data.transaction.address;
  }
  return (
    <DashboardLayout data={user}>
      <div className="flex justify-between text-gray-900">
        <h1 className="text-3xl font-bold">Withdrawal Check</h1>
        <MarkAsButton
          title="Mark As Successful"
          submitUrl={`/admin/transaction/Completed/${request}`}
          triggerUrl={`/admin/transactions`}
          returnRoute={`/admin/transactions`}
          classNames="bg-primary text-white p-3 w-1/4 hover:bg-primaryAccent"
        />
        <MarkAsButton
          title="Mark As Failed"
          submitUrl={`/admin/transaction/Failed/${request}`}
          triggerUrl={`/admin/transactions`}
          returnRoute={`/admin/transactions`}
          classNames="bg-red-600 text-white p-3 w-1/4 hover:bg-red-800"
        />
      </div>
      <div className="mt-5 grid grid-cols-6 gap-4 w-full">
        {data ? (
          <table className="w-full shadow-lg bg-white text-center col-start-2 col-span-4">
            <thead>
              <tr>
                {verificationRequestTableHeader.map((header: string) => (
                  <th
                    key={header}
                    className="w-1/2 bg-primary font-semibold border px-8 py-4 text-white capitalize"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(data.transaction).map((d: any) => {
                if (d[0] === "createdAt")
                  d[1] = formatDate(d[1], "ddd, MMM D, YYYY h:mm A");
                return (
                  <tr key={d[0]} className="w-1/2">
                    <td className="font-semibold border px-8 py-4 capitalize">
                      {d[0]}
                    </td>
                    <td className="font-semibold border px-8 py-4 capitalize">
                      {d[1]}
                    </td>
                  </tr>
                );
              })}

              <tr className="w-1/2">
                <td className="font-semibold border px-8 py-4 capitalize">
                  Payment Method
                </td>
                <td className="font-semibold border px-8 py-4 capitalize">
                  {data.transactionDetail.cardIssuer}
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <FullWidthReactLoader />
        )}
      </div>
    </DashboardLayout>
  );
};

export default WithdrawalRequests;

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
